import React, { useState, useEffect } from 'react'

export default function App() {
  // Navigation scrolling state
  const [scrolled, setScrolled] = useState(false)
  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false)
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  })
  // Form validation errors state
  const [errors, setErrors] = useState({})
  // Form submission success state
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Track scroll position to update header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle mobile menu close when clicking links
  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault()
    setMenuOpen(false)
    const element = document.getElementById(targetId)
    if (element) {
      const offset = 80 // Header height
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'กรุณากรอกชื่อ-นามสกุล'
    if (!formData.phone.trim()) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์'
    } else if (!/^[0-9\-+() ]{9,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง'
    }
    if (!formData.subject.trim()) newErrors.subject = 'กรุณาระบุเรื่องที่ต้องการติดต่อ'
    if (!formData.message.trim()) newErrors.message = 'กรุณากรอกรายละเอียดข้อความ'
    return newErrors
  }

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      setIsSubmitted(true)
      // Reset form fields
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      })
      // Clear success banner after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 8000)
    }
  }

  return (
    <div className="app-wrapper">
      {/* TOP HEADER BAR */}
      <div className="top-header-bar">
        <div className="container top-bar-container">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <span className="icon">📞</span> 087-552-2630 (ทนายฤทธิ์)
            </span>
            <span className="top-bar-separator">|</span>
            <span className="top-bar-item">
              <span className="icon">✉️</span> boonyalit_108@hotmail.com
            </span>
          </div>
          <div className="top-bar-right">
            <div className="lang-selector">
              <button className="lang-btn lang-btn--active">TH</button>
              <button className="lang-btn">EN</button>
              <button className="lang-btn">中文</button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER / NAVIGATION */}
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#" className="logo" onClick={(e) => handleNavLinkClick(e, 'hero')}>
            {/* SVG Logo: Scales of Justice */}
            <svg className="logo-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C11.45 2 11 2.45 11 3V4.07C7.61 4.53 5 7.46 5 11C5 11.28 5.02 11.55 5.06 11.82L2.09 13.8C1.88 13.94 1.79 14.2 1.89 14.42L2.83 16.5C2.94 16.72 3.2 16.81 3.42 16.7L6.39 14.73C7.54 16.14 9.29 17 11 17.07V19H9C8.45 19 8 19.45 8 20C8 20.55 8.45 21 9 21H15C15.55 21 16 20.55 16 20C16 19.45 15.55 19 15 19H13V17.07C14.71 17 16.46 16.14 17.61 14.73L20.58 16.7C20.8 16.81 21.06 16.72 21.17 16.5L22.11 14.42C22.21 14.2 22.12 13.94 21.91 13.8L18.94 11.82C18.98 11.55 19 11.28 19 11C19 7.46 16.39 4.53 13 4.07V3C13 2.45 12.55 2 12 2M12 6C14.4 6 16.38 7.72 16.89 10H7.11C7.62 7.72 9.6 6 12 6M6.33 11.83C6.39 12.35 6.78 12.77 7.3 12.83C7.82 12.89 8.29 12.57 8.35 12.05C8.41 11.53 8.02 11.11 7.5 11.05C6.98 10.99 6.51 11.31 6.45 11.83M17.55 11.83C17.61 12.35 18.08 12.67 18.6 12.61C19.12 12.55 19.51 12.07 19.45 11.55C19.39 11.03 18.92 10.71 18.4 10.77C17.88 10.83 17.49 11.31 17.55 11.83Z"/>
            </svg>
            <div className="logo-text">
              <span className="logo-title">สำนักกฎหมายอุดมฤทธิ์</span>
              <span className="logo-subtitle">UDOMRIT LAW OFFICE</span>
              <span className="logo-chinese">乌隆律师事务所</span>
            </div>
          </a>

          {/* DESKTOP NAV & CALL ACTION */}
          <div className={`nav-links-wrapper ${menuOpen ? 'nav-links-wrapper--open' : ''}`}>
            <ul className="nav-links">
              <li>
                <a href="#hero" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'hero')}>หน้าแรก</a>
              </li>
              <li>
                <a href="#about" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'about')}>เกี่ยวกับเรา</a>
              </li>
              <li>
                <a href="#services" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'services')}>บริการของเรา</a>
              </li>
              <li>
                <a href="#about" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'about')}>บทความกฎหมาย</a>
              </li>
              <li>
                <a href="#about" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'about')}>รีวิวลูกความ</a>
              </li>
              <li>
                <a href="#contact" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'contact')}>ติดต่อเรา</a>
              </li>
            </ul>
            <a href="#contact" className="btn-contact-nav" onClick={(e) => handleNavLinkClick(e, 'contact')}>
              ⚖️ ปรึกษากฎหมาย
            </a>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ transform: menuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none' }}></span>
            <span style={{ opacity: menuOpen ? 0 : 1 }}></span>
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">สำนักกฎหมายอุดมฤทธิ์</h1>
            <h2 className="hero-english-title">UDOMRIT LAW OFFICE</h2>
            <h3 className="hero-chinese-title">乌隆律师事务所</h3>
            
            <p className="hero-desc">
              ให้คำปรึกษากฎหมาย รับว่าความทั่วราชอาณาจักร<br/>
              ดำเนินคดี ฟ้องร้อง เรียกทรัพย์ และร่างสัญญา โดยทีมงานมืออาชีพ
            </p>
            
            {/* Key highlights grid */}
            <div className="hero-highlights">
              <div className="hero-highlight-card">
                <div className="highlight-icon-box">
                  <svg className="highlight-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                  </svg>
                </div>
                <div className="highlight-text">
                  <span className="highlight-title">รับว่าความ</span>
                  <span className="highlight-desc">ทั่วราชอาณาจักร</span>
                </div>
              </div>

              <div className="hero-highlight-card">
                <div className="highlight-icon-box">
                  <svg className="highlight-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21h-2v-2h2v2zm-4-2H5c-1.1 0-2-.9-2-2v-1c0-.55.45-1 1-1h1c0-2.21 1.79-4 4-4v-1.17c-.59-.34-1-.98-1-1.71 0-1.1.9-2 2-2s2 .9 2 2c0 .73-.41 1.37-1 1.71V11c2.21 0 4 1.79 4 4h1c.55 0 1 .45 1 1v1c0 1.1-.9 2-2 2zM6.82 15h6.36C12.63 13.82 11.41 13 10 13s-2.63.82-3.18 2zM12 5.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5.22.5.5.5.5-.22.5-.5z"/>
                  </svg>
                </div>
                <div className="highlight-text">
                  <span className="highlight-title">ดำเนินคดี</span>
                  <span className="highlight-desc">ฟ้องร้อง เรียกทรัพย์</span>
                </div>
              </div>

              <div className="hero-highlight-card">
                <div className="highlight-icon-box">
                  <svg className="highlight-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                </div>
                <div className="highlight-text">
                  <span className="highlight-title">ร่างสัญญา</span>
                  <span className="highlight-desc">และเอกสารกฎหมาย</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: LAWYER PHOTO WITH BADGE */}
          <div className="hero-lawyer-container">
            <div className="hero-lawyer-image-wrapper">
              <img src="/lawyer.jpg" alt="ทนายบุญฤทธิ์" className="hero-lawyer-image" />
              <div className="hero-lawyer-overlay-badge">
                <h3 className="badge-name">ทนายบุญฤทธิ์</h3>
                <p className="badge-title">ทนายความ / หัวหน้าสำนักงาน</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CONTACT BAR SECTION */}
      <section className="quick-contact-section">
        <div className="container">
          <div className="quick-contact-bar">
            {/* Phone */}
            <div className="quick-contact-item">
              <div className="quick-contact-icon-wrapper">📞</div>
              <div className="quick-contact-info">
                <span className="quick-contact-label">โทรศัพท์</span>
                <span className="quick-contact-value">
                  <a href="tel:087-552-2630">087-552-2630</a><br/>
                  <span className="quick-contact-sub">(ทนายฤทธิ์)</span>
                </span>
              </div>
            </div>
            
            {/* Email */}
            <div className="quick-contact-item">
              <div className="quick-contact-icon-wrapper">✉️</div>
              <div className="quick-contact-info">
                <span className="quick-contact-label">อีเมล</span>
                <span className="quick-contact-value">
                  <a href="mailto:boonyalit_108@hotmail.com">boonyalit_108@hotmail.com</a>
                </span>
              </div>
            </div>
            
            {/* Address */}
            <div className="quick-contact-item">
              <div className="quick-contact-icon-wrapper">📍</div>
              <div className="quick-contact-info">
                <span className="quick-contact-label">ที่ตั้งสำนักงาน</span>
                <span className="quick-contact-value">
                  หมู่ 7 ต.ขันเงิน อ.หลังสวน<br/>
                  จ.ชุมพร 86110
                </span>
              </div>
            </div>
            
            {/* Hours */}
            <div className="quick-contact-item">
              <div className="quick-contact-icon-wrapper">🕒</div>
              <div className="quick-contact-info">
                <span className="quick-contact-label">เวลาทำการ</span>
                <span className="quick-contact-value">ทุกวัน 08.30 - 18.00 น.</span>
              </div>
            </div>
            
            {/* LINE CTA Button */}
            <a href="https://line.me/ti/p/~@udomrit.law" target="_blank" rel="noopener noreferrer" className="btn-line">
              <div className="line-icon-box">
                {/* SVG LINE Icon */}
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M24 10.3c0-4.8-5.4-8.8-12-8.8S0 5.5 0 10.3c0 4.3 4.3 7.9 10.1 8.7.4.1.9.3 1 .7.1.3.1.8 0 1.2l-.4 2.2c-.1.5-.4 2 .4 1.4.8-.6 4.3-5.1 5.9-7.1 4.3-1.2 7-4 7-6.4zM7.5 13.5H5.8c-.3 0-.5-.2-.5-.5V8.1c0-.3.2-.5.5-.5h.6c.3 0 .5.2.5.5v4.3h.6c.3 0 .5.2.5.5v.6c0 .3-.2.5-.5.5zm2.7 0H9.6c-.3 0-.5-.2-.5-.5V8.1c0-.3.2-.5.5-.5h.6c.3 0 .5.2.5.5v4.9c0 .3-.2.5-.5.5zm7.3 0h-2.9c-.3 0-.5-.2-.5-.5V8.1c0-.3.2-.5.5-.5h2.9c.3 0 .5.2.5.5v.6c0 .3-.2.5-.5.5h-2.3v1.1h1.7c.3 0 .5.2.5.5v.6c0 .3-.2.5-.5.5h-1.7v1.2h2.3c.3 0 .5.2.5.5v.6c0 .3-.2.5-.5.5zm-3.3 0h-.6c-.2 0-.3-.1-.4-.2L11 9.7v3.3c0 .3-.2.5-.5.5h-.6c-.3 0-.5-.2-.5-.5V8.1c0-.3.2-.5.5-.5h.6c.2 0 .3.1.4.2l2.3 3.5V8.1c0-.3.2-.5.5-.5h.6c.3 0 .5.2.5.5v4.9c0 .3-.2.5-.5.5z"/>
                </svg>
              </div>
              <div className="line-content">
                <span className="line-title">ปรึกษาทาง LINE</span>
                <span className="line-handle">@udomrit.law</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="section services-section">
        <div className="container services-container">
          <div className="services-left">
            <h2 className="services-main-title">บริการของเรา</h2>
            <p className="services-main-desc">
              บริการด้านกฎหมายครบวงจร โดยทีมงานมืออาชีพ
            </p>
            <a href="#contact" className="btn btn-secondary btn-all-services" onClick={(e) => handleNavLinkClick(e, 'contact')}>
              ดูบริการทั้งหมด
            </a>
          </div>

          <div className="services-right">
            <div className="services-grid">
              {/* Card 1: Civil Law */}
              <div className="service-card" onClick={(e) => handleNavLinkClick(e, 'contact')}>
                <div className="service-icon-box">
                  <svg className="service-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C11.45 2 11 2.45 11 3V4.07C7.61 4.53 5 7.46 5 11C5 11.28 5.02 11.55 5.06 11.82L2.09 13.8C1.88 13.94 1.79 14.2 1.89 14.42L2.83 16.5C2.94 16.72 3.2 16.81 3.42 16.7L6.39 14.73C7.54 16.14 9.29 17 11 17.07V19H9C8.45 19 8 19.45 8 20C8 20.55 8.45 21 9 21H15C15.55 21 16 20.55 16 20C16 19.45 15.55 19 15 19H13V17.07C14.71 17 16.46 16.14 17.61 14.73L20.58 16.7C20.8 16.81 21.06 16.72 21.17 16.5L22.11 14.42C22.21 14.2 22.12 13.94 21.91 13.8L18.94 11.82C18.98 11.55 19 11.28 19 11C19 7.46 16.39 4.53 13 4.07V3C13 2.45 12.55 2 12 2M12 6C14.4 6 16.38 7.72 16.89 10H7.11C7.62 7.72 9.6 6 12 6M6.33 11.83C6.39 12.35 6.78 12.77 7.3 12.83C7.82 12.89 8.29 12.57 8.35 12.05C8.41 11.53 8.02 11.11 7.5 11.05C6.98 10.99 6.51 11.31 6.45 11.83M17.55 11.83C17.61 12.35 18.08 12.67 18.6 12.61C19.12 12.55 19.51 12.07 19.45 11.55C19.39 11.03 18.92 10.71 18.4 10.77C17.88 10.83 17.49 11.31 17.55 11.83Z"/>
                  </svg>
                </div>
                <h3 className="service-title">คดีแพ่ง</h3>
              </div>

              {/* Card 2: Criminal Law */}
              <div className="service-card" onClick={(e) => handleNavLinkClick(e, 'contact')}>
                <div className="service-icon-box">
                  <svg className="service-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21h-2v-2h2v2zm-4-2H5c-1.1 0-2-.9-2-2v-1c0-.55.45-1 1-1h1c0-2.21 1.79-4 4-4v-1.17c-.59-.34-1-.98-1-1.71 0-1.1.9-2 2-2s2 .9 2 2c0 .73-.41 1.37-1 1.71V11c2.21 0 4 1.79 4 4h1c.55 0 1 .45 1 1v1c0 1.1-.9 2-2 2zM6.82 15h6.36C12.63 13.82 11.41 13 10 13s-2.63.82-3.18 2zM12 5.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5.22.5.5.5.5-.22.5-.5z"/>
                  </svg>
                </div>
                <h3 className="service-title">คดีอาญา</h3>
              </div>

              {/* Card 3: Contracts */}
              <div className="service-card" onClick={(e) => handleNavLinkClick(e, 'contact')}>
                <div className="service-icon-box">
                  <svg className="service-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                </div>
                <h3 className="service-title">ร่างสัญญา</h3>
              </div>

              {/* Card 4: Legal Advisor */}
              <div className="service-card" onClick={(e) => handleNavLinkClick(e, 'contact')}>
                <div className="service-icon-box">
                  <svg className="service-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h3 className="service-title">ที่ปรึกษากฎหมาย</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section about">
        <div className="container about-grid">
          <div className="about-image-wrapper">
            <div className="about-image-card">
              <div className="about-image-placeholder">
                <svg className="about-profile-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <h4 className="about-profile-name">ทนายบุญฤทธิ์</h4>
                <p className="about-profile-title">ทนายความวิชาชีพ / หัวหน้าสำนักงาน</p>
              </div>
              <div className="about-profile-badge">
                <div className="badge-years">10+</div>
                <div className="badge-text">ปีแห่งความเชื่อมั่น</div>
              </div>
            </div>
          </div>

          <div className="about-content">
            <span className="about-subtitle">ABOUT OUR FIRM</span>
            <h2 className="about-title">ยึดมั่นความถูกต้อง รับฟังด้วยความใส่ใจ</h2>
            <p className="about-text">
              สำนักกฎหมายอุดมฤทธิ์ ก่อตั้งโดย <strong>ทนายบุญฤทธิ์</strong> เพื่อให้บริการทางด้านกฎหมาย 
              ว่าความ ดำเนินคดีแพ่ง คดีอาญา คดีประกันภัย ในอำเภอหลังสวน จังหวัดชุมพร และพื้นที่ใกล้เคียง 
              รวมถึงรับว่าความทั่วราชอาณาจักร 
              เรายึดมั่นในวิชาชีพจรรยาบรรณ ให้คำปรึกษาด้วยข้อมูลที่ตรงไปตรงมา ชี้ช่องทางกฎหมายอย่างชัดเจน 
              เพื่อปกป้องสิทธิและช่วยบรรเทาความกังวลใจของลูกความทุกท่าน
            </p>

            <div className="about-values">
              {/* Value 1 */}
              <div className="value-item">
                <svg className="value-check-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <div>
                  <h4 className="value-title">ซื่อสัตย์สุจริต</h4>
                  <p className="value-desc">วิเคราะห์ข้อกฎหมายตามความเป็นจริง ไม่ชวนเชื่อในสิ่งที่เป็นไปไม่ได้</p>
                </div>
              </div>

              {/* Value 2 */}
              <div className="value-item">
                <svg className="value-check-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <div>
                  <h4 className="value-title">เชี่ยวชาญ คมชัด</h4>
                  <p className="value-desc">เจาะลึกแนวคำพิพากษาและระเบียบกฎหมายอย่างรอบด้านเพื่อประโยชน์สูงสุด</p>
                </div>
              </div>

              {/* Value 3 */}
              <div className="value-item">
                <svg className="value-check-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <div>
                  <h4 className="value-title">ใส่ใจทุกรายละเอียด</h4>
                  <p className="value-desc">อัปเดตความคืบหน้าของคดีให้ลูกความทราบอย่างสม่ำเสมอในทุกกระบวนการ</p>
                </div>
              </div>

              {/* Value 4 */}
              <div className="value-item">
                <svg className="value-check-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <div>
                  <h4 className="value-title">เข้าถึงและปรึกษาง่าย</h4>
                  <p className="value-desc">ติดต่อทนายความได้โดยตรง ไม่ผ่านคนกลาง เพื่อให้ได้คำแนะนำที่ถูกต้องฉับไว</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-title">
            <span className="text-gold display-font" style={{letterSpacing:'2px', display:'block', marginBottom:'0.5rem', fontSize:'0.9rem', fontWeight:'600'}}>CONTACT US</span>
            <h2>ติดต่อรับคำปรึกษา</h2>
          </div>

          <div className="contact-grid">
            {/* Contact Info Card */}
            <div className="contact-info-card">
              <div>
                <h3 className="contact-info-title text-gold">สำนักกฎหมายอุดมฤทธิ์</h3>
                <p className="contact-info-desc">พร้อมยินดีให้บริการและให้คำปรึกษาปัญหาด้านกฎหมายแก่ท่านอย่างเป็นกันเอง</p>
              </div>

              <div className="contact-details">
                {/* Phone */}
                <div className="contact-item">
                  <div className="contact-icon-box">
                    <svg className="contact-item-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.56 11.56 0 0 1 8.82 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.62c0-.55-.45-1-1-1z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="contact-item-label">เบอร์โทรศัพท์</p>
                    <p className="contact-item-value">
                      <a href="tel:087-552-2630">087-552-2630</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-item">
                  <div className="contact-icon-box">
                    <svg className="contact-item-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="contact-item-label">อีเมล</p>
                    <p className="contact-item-value">
                      <a href="mailto:boonyalit_108@hotmail.com">boonyalit_108@hotmail.com</a>
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="contact-item">
                  <div className="contact-icon-box">
                    <svg className="contact-item-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="contact-item-label">ที่ตั้งสำนักงาน</p>
                    <p className="contact-item-value">
                      หมู่ 7 ตำบลขันเงิน อำเภอหลังสวน จังหวัดชุมพร 86110
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="contact-item">
                  <div className="contact-icon-box">
                    <svg className="contact-item-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="contact-item-label">เวลาทำการ</p>
                    <p className="contact-item-value">
                      วันจันทร์ - วันศุกร์: 08:30 - 17:00 น.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Wrapper */}
            <div className="contact-form-wrapper">
              <h3 className="contact-form-title">ส่งข้อความถึงเรา</h3>
              <p className="contact-form-subtitle">กรอกรายละเอียดคำถามของท่านเพื่อให้ทนายความติดต่อกลับ</p>

              {isSubmitted && (
                <div className="form-success-box">
                  ✓ ส่งข้อความของท่านเรียบร้อยแล้ว สำนักงานจะติดต่อกลับโดยด่วนที่สุด ขอบคุณครับ
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">ชื่อ-นามสกุล *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="เช่น สมชาย มีความสุข"
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">เบอร์โทรศัพท์ *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="เช่น 0812345678"
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>

                  {/* Email */}
                  <div className="form-group full-width">
                    <label htmlFor="email" className="form-label">อีเมล (ถ้ามี)</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="เช่น name@example.com"
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  {/* Subject */}
                  <div className="form-group full-width">
                    <label htmlFor="subject" className="form-label">เรื่องที่ติดต่อ *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-input"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="เช่น ปรึกษาคดีมรดก, สอบถามคดีรถชน"
                    />
                    {errors.subject && <span className="form-error">{errors.subject}</span>}
                  </div>

                  {/* Message */}
                  <div className="form-group full-width">
                    <label htmlFor="message" className="form-label">ข้อความรายละเอียด *</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="กรอกรายละเอียดปัญหาของท่านเบื้องต้น..."
                    ></textarea>
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-submit">
                  ส่งข้อความ
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-info">
              <div className="logo footer-logo">
                <svg className="logo-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C11.45 2 11 2.45 11 3V4.07C7.61 4.53 5 7.46 5 11C5 11.28 5.02 11.55 5.06 11.82L2.09 13.8C1.88 13.94 1.79 14.2 1.89 14.42L2.83 16.5C2.94 16.72 3.2 16.81 3.42 16.7L6.39 14.73C7.54 16.14 9.29 17 11 17.07V19H9C8.45 19 8 19.45 8 20C8 20.55 8.45 21 9 21H15C15.55 21 16 20.55 16 20C16 19.45 15.55 19 15 19H13V17.07C14.71 17 16.46 16.14 17.61 14.73L20.58 16.7C20.8 16.81 21.06 16.72 21.17 16.5L22.11 14.42C22.21 14.2 22.12 13.94 21.91 13.8L18.94 11.82C18.98 11.55 19 11.28 19 11C19 7.46 16.39 4.53 13 4.07V3C13 2.45 12.55 2 12 2M12 6C14.4 6 16.38 7.72 16.89 10H7.11C7.62 7.72 9.6 6 12 6M6.33 11.83C6.39 12.35 6.78 12.77 7.3 12.83C7.82 12.89 8.29 12.57 8.35 12.05C8.41 11.53 8.02 11.11 7.5 11.05C6.98 10.99 6.51 11.31 6.45 11.83M17.55 11.83C17.61 12.35 18.08 12.67 18.6 12.61C19.12 12.55 19.51 12.07 19.45 11.55C19.39 11.03 18.92 10.71 18.4 10.77C17.88 10.83 17.49 11.31 17.55 11.83Z"/>
                </svg>
                <div className="logo-text">
                  <span className="logo-title" style={{color:'#d4af37'}}>สำนักกฎหมายอุดมฤทธิ์</span>
                  <span className="logo-subtitle">UDOMRIT LAW OFFICE</span>
                </div>
              </div>
              <p className="footer-desc">
                สำนักงานกฎหมายในอำเภอหลังสวน จังหวัดชุมพร รับว่าความทั่วราชอาณาจักร 
                ให้คำปรึกษาทางข้อกฎหมายด้วยความเที่ยงธรรม ซื่อสัตย์ และเป็นธรรมในค่าใช้จ่าย
              </p>
            </div>

            <div>
              <h4 className="footer-links-title">ลิงก์ทางลัด</h4>
              <ul className="footer-links">
                <li>
                  <a href="#hero" className="footer-link" onClick={(e) => handleNavLinkClick(e, 'hero')}>หน้าแรก</a>
                </li>
                <li>
                  <a href="#services" className="footer-link" onClick={(e) => handleNavLinkClick(e, 'services')}>บริการกฎหมาย</a>
                </li>
                <li>
                  <a href="#about" className="footer-link" onClick={(e) => handleNavLinkClick(e, 'about')}>เกี่ยวกับสำนักงาน</a>
                </li>
                <li>
                  <a href="#contact" className="footer-link" onClick={(e) => handleNavLinkClick(e, 'contact')}>ติดต่อทนายความ</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">
              &copy; {new Date().getFullYear()} สำนักกฎหมายอุดมฤทธิ์. All Rights Reserved.
            </p>
            <p className="disclaimer">
              คำเตือน: ข้อมูลบนเว็บไซต์นี้มีวัตถุประสงค์เพื่อการแนะนำสำนักงานและเผยแพร่ความรู้ทั่วไปทางกฎหมายเท่านั้น<br />
              มิใช่การให้คำแนะนำหรือความเห็นทางกฎหมายโดยตรงในคดีเฉพาะเรื่องของท่าน
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
