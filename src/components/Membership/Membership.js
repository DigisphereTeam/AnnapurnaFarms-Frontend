import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Membership.css';

const Membership = () => {
  // State for Billing Cycle Toggle ('monthly' | 'yearly')
  const [billingCycle, setBillingCycle] = useState('yearly');
  
  // State for Active FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Plan pricing data based on toggle
  const plans = [
    {
      id: 'basic',
      name: 'Annapurna Basic',
      subtitle: 'For first-time buyers',
      price: 'Free',
      period: '',
      popular: false,
      buttonText: 'Join Free',
      features: [
        '5% off on your first order',
        'Early access to Special Sale',
        'Order tracking & purchase history',
      ],
    },
    {
      id: 'platinum',
      name: 'Annapurna Platinum',
      subtitle: 'For regular home kitchens',
      price: billingCycle === 'yearly' ? 'Rs. 499/-' : 'Rs. 59/-',
      period: billingCycle === 'yearly' ? '/year' : '/month',
      popular: true,
      buttonText: 'Become a Platinum Member',
      features: [
        '10% off on all powders & masalas',
        'Free delivery on orders above Rs. 299',
        '1 free 100 gm sample pack every month',
        'Priority customer support',
      ],
    },
    {
      id: 'gold',
      name: 'Annapurna Gold',
      subtitle: 'For families & bulk buyers',
      price: billingCycle === 'yearly' ? 'Rs. 999/-' : 'Rs. 119/-',
      period: billingCycle === 'yearly' ? '/year' : '/month',
      popular: false,
      buttonText: 'Go Gold',
      features: [
        '15% off on every order',
        'Free delivery on all orders',
        'Monthly curated spice box',
        'First access to new launches',
        'Birthday & festival special offers',
      ],
    },
  ];

  // Comparison table rows
  const comparisonData = [
    { benefit: 'Discount on orders', basic: '5% (first order)', gold: '10%', platinum: '15%' },
    { benefit: 'Free delivery', basic: '—', gold: 'Above Rs. 299', platinum: 'All orders' },
    { benefit: 'Monthly sample pack (100 gm)', basic: '—', gold: '✓', platinum: '✓' },
    { benefit: 'Curated monthly spice box', basic: '—', gold: '—', platinum: '✓' },
    { benefit: 'Early access to Special Sale', basic: '✓', gold: '✓', platinum: '✓' },
    { benefit: 'First access to new launches', basic: '—', gold: '—', platinum: '✓' },
    { benefit: 'Priority customer support', basic: '—', gold: '✓', platinum: '✓' },
    { benefit: 'Birthday & festival offers', basic: '—', gold: '—', platinum: '✓' },
    {
      benefit: billingCycle === 'yearly' ? 'Price (yearly)' : 'Price (monthly)',
      basic: 'Free',
      gold: billingCycle === 'yearly' ? 'Rs. 499/-' : 'Rs. 59/-',
      platinum: billingCycle === 'yearly' ? 'Rs. 999/-' : 'Rs. 119/-',
      isPriceRow: true,
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: 'How do I become a member?',
      answer:
        'Choose a plan on this page, sign in to your account and complete the payment. Your membership is active right away.',
    },
    {
      question: 'When do member discounts apply?',
      answer:
        'Once signed in with an active membership, your eligible tier discount is automatically calculated and applied at checkout.',
    },
    {
      question: 'Can I cancel or change my plan?',
      answer:
        'Yes, you can upgrade, downgrade, or cancel your membership anytime from your Annapurna account settings without any cancellation fees.',
    },
    {
      question: 'Do discounts work on Special Sale products?',
      answer:
        'Yes! Member discounts stack with our Special Sale offers, and Gold/Platinum members also get early access before the sale goes live to the public.',
    },
    {
      question: 'Where do you deliver the monthly spice box?',
      answer:
        'We deliver monthly sample packs and curated spice boxes across all serviceable pin codes in India along with your regular orders or as a standalone dispatch.',
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="annapurna-membership-page">
      {/* =========================================================
          SECTION 1: HERO & HIGHLIGHTS
      ========================================================= */}
      <section className="hero-section py-4 py-md-5">
        <div className="container">

          <div className="row align-items-center g-4">
            {/* Left Content */}
            <div className="col-lg-6">
              <span className="badge-pill-green mb-3 d-inline-block">
                Annapurna Membership
              </span>
              <h1 className="hero-title mb-3">
                Pure spices, <span className="text-brand-green">bigger savings</span>
              </h1>
              <p className="hero-subtitle mb-4">
                Join the Annapurna family and save on herbal, floral, karam, masala
                and vegetable powders every time you shop, with free delivery and a
                monthly sample pack.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#plans-section" className="btn btn-brand-solid">
                  See Plans
                </a>
                <a href="#faq-section" className="btn btn-brand-outline">
                  Have questions?
                </a>
              </div>
            </div>

            {/* Right 2x2 Feature Cards */}
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <div className="hero-stat-card">
                    <h4 className="stat-title">Up to 15%</h4>
                    <p className="stat-desc mb-0">off on every order</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="hero-stat-card">
                    <h4 className="stat-title">Free</h4>
                    <p className="stat-desc mb-0">delivery for members</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="hero-stat-card">
                    <h4 className="stat-title">Monthly</h4>
                    <p className="stat-desc mb-0">sample pack / spice box</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="hero-stat-card">
                    <h4 className="stat-title">Anytime</h4>
                    <p className="stat-desc mb-0">cancel or upgrade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: HOW IT WORKS
      ========================================================= */}
      <section className="how-it-works-section py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-heading">
              How it <span className="text-brand-green">Works</span>
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="step-card text-center h-100">
                <div className="step-circle mx-auto mb-3">1</div>
                <h5 className="step-title">Choose a plan</h5>
                <p className="step-desc mb-0">
                  Pick Basic, Gold or Platinum, monthly or yearly
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="step-card text-center h-100">
                <div className="step-circle mx-auto mb-3">2</div>
                <h5 className="step-title">Sign in &amp; activate</h5>
                <p className="step-desc mb-0">
                  Log in to your Annapurna account and complete payment
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="step-card text-center h-100">
                <div className="step-circle mx-auto mb-3">3</div>
                <h5 className="step-title">Save on every order</h5>
                <p className="step-desc mb-0">
                  Member discounts apply automatically at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: OUR MEMBERSHIP (PRICING CARDS)
      ========================================================= */}
      <section id="plans-section" className="pricing-section py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-heading">
              Our <span className="text-brand-green">Membership</span>
            </h2>
            <p className="section-subheading mx-auto">
              Join the Annapurna family and save on pure, natural powders every time
              you shop.
            </p>

            {/* Monthly / Yearly Billing Toggle */}
            <div className="billing-toggle-wrapper d-inline-flex align-items-center mt-2">
              <button
                type="button"
                className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly <span className="save-badge">Save 16%</span>
              </button>
            </div>
          </div>

          {/* 3 Plan Cards */}
          <div className="row g-4 align-items-stretch mt-2">
            {plans.map((plan) => (
              <div key={plan.id} className="col-lg-4 col-md-6">
                <div
                  className={`plan-card h-100 d-flex flex-column ${
                    plan.popular ? 'plan-card-popular' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="popular-ribbon">Most Popular</div>
                  )}

                  <div className="plan-header mb-3">
                    <h4 className="plan-name mb-1">{plan.name}</h4>
                    <p className="plan-subtitle mb-3">{plan.subtitle}</p>
                    <div className="plan-price-box">
                      <span className="plan-price">{plan.price}</span>
                      {plan.period && (
                        <span className="plan-period"> {plan.period}</span>
                      )}
                    </div>
                  </div>

                  <ul className="plan-features list-unstyled mb-4 flex-grow-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="d-flex align-items-start mb-2">
                        <span className="check-icon me-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`btn w-100 plan-cta-btn ${
                      plan.popular ? 'btn-brand-solid' : 'btn-brand-outline'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center footer-note mt-4 mb-0">
            Cancel anytime. Member discounts apply automatically at checkout once you’re signed in.
          </p>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: COMPARE PLANS TABLE
      ========================================================= */}
      <section className="compare-section py-5 bg-white">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-heading">
              Compare <span className="text-brand-green">Plans</span>
            </h2>
          </div>

          <div className="table-responsive compare-table-wrapper">
            <table className="table compare-table mb-0 align-middle">
              <thead>
                <tr>
                  <th className="text-start benefits-col">Benefits</th>
                  <th className="text-center plan-col">Basic</th>
                  <th className="text-center plan-col gold-col-header">Gold</th>
                  <th className="text-center plan-col">Platinum</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className={row.isPriceRow ? 'price-summary-row' : ''}>
                    <td className="text-start benefit-label">{row.benefit}</td>
                    <td className="text-center">
                      {row.basic === '✓' ? (
                        <span className="table-check">✓</span>
                      ) : (
                        <span className={row.isPriceRow ? 'text-brand-green fw-bold' : ''}>
                          {row.basic}
                        </span>
                      )}
                    </td>
                    <td className="text-center gold-col-cell">
                      {row.gold === '✓' ? (
                        <span className="table-check">✓</span>
                      ) : (
                        <span className={row.isPriceRow ? 'text-brand-green fw-bold' : ''}>
                          {row.gold}
                        </span>
                      )}
                    </td>
                    <td className="text-center">
                      {row.platinum === '✓' ? (
                        <span className="table-check">✓</span>
                      ) : (
                        <span className={row.isPriceRow ? 'text-brand-green fw-bold' : ''}>
                          {row.platinum}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5: MEMBERSHIP FAQS
      ========================================================= */}
      <section id="faq-section" className="faq-section py-5 bg-white">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-heading">
              Membership <span className="text-brand-green">FAQs</span>
            </h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="faq-list d-flex flex-column gap-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
                    >
                      <button
                        type="button"
                        className="faq-question-btn d-flex justify-content-between align-items-center w-100 text-start"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        <span className="faq-toggle-icon">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="faq-answer">
                          <p className="mb-0">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 6: BOTTOM CALL-TO-ACTION BANNER
      ========================================================= */}
      <section className="cta-banner-section py-4 pb-5 bg-white">
        <div className="container">
          <div className="cta-banner-box d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
              <h4 className="cta-title mb-1">Ready to save on every order?</h4>
              <p className="cta-subtitle mb-0">
                Join free today or upgrade to Gold for 10% off and free delivery.
              </p>
            </div>
            <div>
              <a href="#plans-section" className="btn btn-cta-white">
                Choose Your Plan
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;