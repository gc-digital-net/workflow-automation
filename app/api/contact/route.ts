import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // In production, you would send this to an email service
    // For now, we'll log it and return success
    console.log('Contact form submission:', data);

    // Optional: Send notification email using a service like SendGrid, AWS SES, etc.
    // await sendContactEmail(data);

    // Optional: Store in database or CRM
    // await storeContactInCRM(data);

    // Optional: Add to email list if consent given
    if (data.email && process.env.CONVERTKIT_API_KEY) {
      // Add to ConvertKit with 'contact-form' tag
      try {
        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(
          `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              api_key: process.env.CONVERTKIT_API_KEY,
              email: data.email,
              first_name: data.name.split(' ')[0],
              tags: ['contact-form'],
              fields: {
                company: data.company,
                phone: data.phone,
              },
            }),
            signal: controller.signal,
          }
        );
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          console.error('ConvertKit API error:', response.status);
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.error('ConvertKit API timeout after 5 seconds');
        } else {
          console.error('Failed to add contact to email list:', error);
        }
      }
    }

    return NextResponse.json(
      { 
        message: 'Thank you for your message. We will get back to you soon!',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}

// Helper function to send email (implement with your preferred service)
async function sendContactEmail(data: ContactFormData) {
  // Example implementation with SendGrid
  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const msg = {
    to: 'contact@workflowautomation.net',
    from: 'noreply@workflowautomation.net',
    subject: `Contact Form: ${data.subject}`,
    text: `
      Name: ${data.name}
      Email: ${data.email}
      Company: ${data.company || 'N/A'}
      Phone: ${data.phone || 'N/A'}
      
      Message:
      ${data.message}
    `,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
      <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  };
  
  await sgMail.send(msg);
  */
}