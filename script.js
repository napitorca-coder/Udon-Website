// =========================================================
// script.js — JavaScript ของหน้าเว็บ
// Bootstrap จัดการ Navbar / Dropdown / Collapse / Carousel / Modal ให้เองผ่าน data-bs-*
// ไฟล์นี้เพิ่มแค่: ตรวจฟอร์ม, ปุ่มแสดงรหัสผ่าน, Toast แจ้งผล, จำอีเมล
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Toast (เรียกคอมโพเนนต์ของ Bootstrap ด้วย JavaScript) ----------
  const toastEl = document.getElementById('liveToast');
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3000 });
  function showToast(message) {
    document.getElementById('toastMsg').textContent = message;
    toast.show();
  }

  // ---------- ปุ่ม แสดง/ซ่อน รหัสผ่าน ----------
  const pw = document.getElementById('loginPassword');
  const togglePw = document.getElementById('togglePw');
  togglePw.addEventListener('click', () => {
    const isHidden = pw.type === 'password';
    pw.type = isHidden ? 'text' : 'password';
    togglePw.textContent = isHidden ? 'ซ่อน' : 'แสดง';
  });

  // ---------- จำอีเมล (Remember me) ----------
  const emailInput = document.getElementById('loginEmail');
  const remember = document.getElementById('remember');
  const saved = localStorage.getItem('schoolEmail');
  if (saved) {
    emailInput.value = saved;
    remember.checked = true;
  }

  // ---------- ฟอร์ม Login ----------
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();                       // ไม่ให้หน้าโหลดใหม่
    loginForm.classList.add('was-validated'); // ให้ Bootstrap แสดงกรอบเขียว/แดง

    if (!loginForm.checkValidity()) return;

    if (remember.checked) localStorage.setItem('schoolEmail', emailInput.value);
    else localStorage.removeItem('schoolEmail');

    showToast('เข้าสู่ระบบสำเร็จ (ตัวอย่าง) ยินดีต้อนรับ ' + emailInput.value);
  });

  // ---------- ปุ่มส่งลิงก์รีเซ็ตรหัสผ่าน (อยู่ในกล่อง Collapse) ----------
  document.getElementById('sendReset').addEventListener('click', () => {
    if (!emailInput.value || !emailInput.checkValidity()) {
      emailInput.focus();
      showToast('กรุณากรอกอีเมลก่อน');
      return;
    }
    showToast('ส่งลิงก์รีเซ็ตไปที่ ' + emailInput.value + ' แล้ว (ตัวอย่าง)');
    bootstrap.Collapse.getOrCreateInstance('#forgotBox').hide();
  });

  // ---------- ฟอร์มสมัครสมาชิก (ใน Modal) ----------
  const signupForm = document.getElementById('signupForm');
  const pw1 = document.getElementById('signupPw');
  const pw2 = document.getElementById('signupPw2');

  // เช็ครหัสผ่านตรงกันไหม ด้วย setCustomValidity
  function checkMatch() {
    pw2.setCustomValidity(pw1.value === pw2.value ? '' : 'not match');
  }
  pw1.addEventListener('input', checkMatch);
  pw2.addEventListener('input', checkMatch);

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkMatch();
    signupForm.classList.add('was-validated');

    if (!signupForm.checkValidity()) return;

    const name = document.getElementById('firstName').value;
    const grade = document.getElementById('grade').value;
    const room = document.getElementById('room').value;

    // ปิด Modal ด้วย JavaScript
    bootstrap.Modal.getOrCreateInstance('#signupModal').hide();
    showToast(`สมัครสำเร็จ! ${name} ชั้น ${grade}/${room} (ตัวอย่าง)`);

    signupForm.reset();
    signupForm.classList.remove('was-validated');
  });

  // ---------- ปิดเมนูมือถืออัตโนมัติเมื่อกดลิงก์ ----------
  const navCollapse = document.getElementById('mainNav');
  document.querySelectorAll('#mainNav .nav-link:not(.dropdown-toggle), #mainNav .dropdown-item').forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });
});
