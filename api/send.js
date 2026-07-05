export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, jamb, dept, whatsapp, email, subjects } = req.body;

  const mathsInJamb = subjects.includes('Mathematics');

  const mathsNote = mathsInJamb
    ? `<p style="margin:12px 0;padding:10px 14px;background:#FFF3E8;border-left:3px solid #F47920;font-size:13px;"><strong>Note:</strong> Since you wrote Mathematics in JAMB, you will answer Mathematics questions in both sections — approximately 13-14 Mathematics questions across the full 40-question paper.</p>`
    : '';

  const utmeRows = subjects.map((s, i) => `
    <tr style="${i % 2 === 0 ? 'background:#F5F5F5;' : ''}">
      <td style="padding:10px 12px;border:1px solid #E5E7EB;font-weight:700;color:#F47920;">${i + 4}</td>
      <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:14px;font-weight:600;">${s}</td>
      <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:13px;color:#6B7280;">5 questions</td>
    </tr>`).join('');

  /* ══════════════════════════════
     STUDENT EMAIL
  ══════════════════════════════ */
  const studentHTML = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">

    <div style="background:#111111;padding:24px;border-bottom:3px solid #F47920;text-align:center;">
      <h1 style="color:#ffffff;font-size:20px;font-weight:800;text-transform:uppercase;letter-spacing:2px;margin:0;">EAC Services Ltd</h1>
      <p style="color:#F47920;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:6px 0 0;">Post-UTME Subject Combination Verification Portal</p>
    </div>

    <div style="padding:28px 24px;">
      <p style="font-size:15px;color:#1A1A1A;margin:0 0 6px;">Hello <strong>${name}</strong>,</p>
      <p style="font-size:14px;color:#6B7280;margin:0 0 24px;">Based on the information you provided, here is your correct Post-UTME Subject Combination for UNILAG 2026.</p>

      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr style="background:#F5F5F5;">
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6B7280;width:38%;">Full Name</td>
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:14px;font-weight:600;">${name}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6B7280;">JAMB Reg No.</td>
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:14px;font-weight:600;">${jamb.toUpperCase()}</td>
        </tr>
        <tr style="background:#F5F5F5;">
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6B7280;">Department</td>
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:14px;font-weight:600;">${dept}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6B7280;">WhatsApp</td>
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:14px;font-weight:600;">${whatsapp}</td>
        </tr>
      </table>

      <div style="background:#111111;border-radius:8px;padding:16px;margin-bottom:16px;">
        <p style="color:#F47920;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;">Fixed Subjects — 25 Questions</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 12px;border:1px solid rgba(255,255,255,0.1);color:#fff;font-weight:700;font-size:13px;">1</td>
            <td style="padding:8px 12px;border:1px solid rgba(255,255,255,0.1);color:#fff;font-size:13px;">English Language</td>
          </tr>
          <tr style="background:rgba(255,255,255,0.04);">
            <td style="padding:8px 12px;border:1px solid rgba(255,255,255,0.1);color:#fff;font-weight:700;font-size:13px;">2</td>
            <td style="padding:8px 12px;border:1px solid rgba(255,255,255,0.1);color:#fff;font-size:13px;">Mathematics</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;border:1px solid rgba(255,255,255,0.1);color:#fff;font-weight:700;font-size:13px;">3</td>
            <td style="padding:8px 12px;border:1px solid rgba(255,255,255,0.1);color:#fff;font-size:13px;">General Knowledge</td>
          </tr>
        </table>
      </div>

      <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6B7280;margin:0 0 8px;">Your UTME Subjects — 15 Questions (5 each)</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <tr style="background:#F47920;">
          <th style="padding:8px 12px;text-align:left;color:#fff;font-size:12px;font-weight:700;border:1px solid #F47920;width:10%;">#</th>
          <th style="padding:8px 12px;text-align:left;color:#fff;font-size:12px;font-weight:700;border:1px solid #F47920;">Subject</th>
          <th style="padding:8px 12px;text-align:left;color:#fff;font-size:12px;font-weight:700;border:1px solid #F47920;">Questions</th>
        </tr>
        ${utmeRows}
      </table>

      ${mathsNote}

      <div style="background:#FFF3E8;border:1px solid #F47920;border-radius:8px;padding:18px;margin-top:24px;">
        <p style="font-size:13px;font-weight:800;text-transform:uppercase;color:#F47920;margin:0 0 8px;letter-spacing:1px;">Join EAC Tutorials — The Redemption '26</p>
        <p style="font-size:13px;color:#1A1A1A;margin:0 0 10px;">Prepare adequately for UNILAG Post-UTME with EAC. Daily classes, mock exams, past questions, expert tutors and more.</p>
        <p style="font-size:14px;color:#111111;margin:0;font-weight:700;">Message EAC to register: <a href="https://wa.me/2349136379483" style="color:#F47920;">09136379483</a></p>
      </div>
    </div>

    <div style="background:#F5F5F5;padding:14px 24px;text-align:center;border-top:1px solid #E5E7EB;">
      <p style="font-size:11px;color:#6B7280;margin:0;"><strong>EAC Services Ltd</strong> — Post-UTME Subject Combination Verification Portal — UNILAG 2026</p>
    </div>
  </div>`;

  /* ══════════════════════════════
     ADMIN EMAIL
  ══════════════════════════════ */
  const adminUtmeRows = subjects.map((s, i) => `
    <tr style="${i % 2 === 0 ? 'background:#F5F5F5;' : ''}">
      <td style="padding:10px 12px;border:1px solid #E5E7EB;font-weight:700;color:#F47920;">${i + 4}</td>
      <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:14px;font-weight:600;">${s}</td>
    </tr>`).join('');

  const adminHTML = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">

    <div style="background:#111111;padding:20px 24px;border-bottom:3px solid #F47920;">
      <h1 style="color:#ffffff;font-size:18px;font-weight:800;text-transform:uppercase;letter-spacing:2px;margin:0;">EAC Services Ltd</h1>
      <p style="color:#F47920;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:4px 0 0;">New Submission — Subject Combination Portal</p>
    </div>

    <div style="padding:24px;">
      <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6B7280;margin:0 0 12px;">Candidate Details</p>

      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr style="background:#F5F5F5;">
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6B7280;width:38%;">Full Name</td>
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:14px;font-weight:600;">${name}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6B7280;">JAMB Reg No.</td>
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:14px;font-weight:600;">${jamb.toUpperCase()}</td>
        </tr>
        <tr style="background:#F5F5F5;">
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6B7280;">Department</td>
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:14px;font-weight:600;">${dept}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6B7280;">WhatsApp</td>
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:14px;font-weight:600;">${whatsapp}</td>
        </tr>
        <tr style="background:#F5F5F5;">
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6B7280;">Email</td>
          <td style="padding:10px 12px;border:1px solid #E5E7EB;font-size:14px;font-weight:600;">${email}</td>
        </tr>
      </table>

      <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6B7280;margin:0 0 12px;">Post-UTME Subject Combination</p>

      <div style="background:#111111;border-radius:8px;padding:14px;margin-bottom:14px;">
        <p style="color:#F47920;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px;">Fixed — 25 Questions</p>
        <p style="color:#ffffff;font-size:13px;margin:0;">English Language &nbsp;|&nbsp; Mathematics &nbsp;|&nbsp; General Knowledge</p>
      </div>

      <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6B7280;margin:0 0 8px;">UTME Subjects — 15 Questions (5 each)</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="background:#F47920;">
          <th style="padding:8px 12px;text-align:left;color:#fff;font-size:12px;font-weight:700;border:1px solid #F47920;width:10%;">#</th>
          <th style="padding:8px 12px;text-align:left;color:#fff;font-size:12px;font-weight:700;border:1px solid #F47920;">Subject</th>
        </tr>
        ${adminUtmeRows}
      </table>
    </div>

    <div style="background:#F5F5F5;padding:14px 24px;text-align:center;border-top:1px solid #E5E7EB;">
      <p style="font-size:11px;color:#6B7280;margin:0;"><strong>EAC Services Ltd</strong> — Post-UTME Subject Combination Verification Portal — UNILAG 2026</p>
    </div>
  </div>`;

  try {
    const ADMIN_EMAIL = 'eacservicesltd@gmail.com';

    // Send to student
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'EAC Services Ltd <onboarding@resend.dev>',
        to: [email],
        subject: `Your Post-UTME Subject Combination — EAC Services Ltd`,
        html: studentHTML,
      }),
    });

    // Send to admin
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'EAC Portal <onboarding@resend.dev>',
        to: [ADMIN_EMAIL],
        subject: `New Submission — ${name} | ${dept}`,
        html: adminHTML,
      }),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
