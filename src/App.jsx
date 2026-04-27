import { useEffect, useState } from 'react';

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80',
    eyebrow: 'Bridal Grandeur',
    title: 'Woven heritage for every unforgettable celebration.',
    copy:
      'Explore festive silks, bridal heirlooms, and elegant sarees designed to feel timeless, graceful, and proudly Indian.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1610041321327-b794da1f8f31?auto=format&fit=crop&w=1600&q=80',
    eyebrow: 'Festive Silks',
    title: 'Classic drapes with a rich and modern boutique presence.',
    copy:
      'From temple borders to zari highlights, each saree is selected to bring warmth, color, and occasion-ready beauty.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1621786030484-4c855eed6974?auto=format&fit=crop&w=1600&q=80',
    eyebrow: 'Everyday Elegance',
    title: 'Luxury sarees curated with softness, light, and authenticity.',
    copy:
      'Discover effortless silks and statement weaves for weddings, gifting, gatherings, and treasured family moments.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1583391733981-8491d84f0c55?auto=format&fit=crop&w=1600&q=80',
    eyebrow: 'Signature Weaves',
    title: 'A thoughtful collection shaped by craftsmanship and detail.',
    copy:
      'Novel Silks brings together refined textures, striking palettes, and boutique styling for women who love tradition.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1596844720739-9b2d94e7d27d?auto=format&fit=crop&w=1600&q=80',
    eyebrow: 'Occasion Edit',
    title: 'Celebrate every ritual in silks that feel special from the first glance.',
    copy:
      'Browse category-led collections and premium saree picks in a bright, inviting store experience.',
  },
];

const categories = [
  {
    id: 'kanjivaram',
    name: 'Bridal Kancheepuram',
    aliases: ['bridal kanchipuram', 'bridal kanjeevaram', 'bridal saree'],
    note: 'Regal bridal and festive weaves',
    image:
      'https://images.unsplash.com/photo-1621784563330-caee0b138a00?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'banarasi',
    name: 'Other Kancheepuram',
    aliases: [
      'kanchipuram',
      'kanjeevaram',
      'kanjivaram',
      'saree',
      'sarees',
      'silk saree',
      'handloom saree',
    ],
    note: 'Rich zari and heritage detailing',
    image:
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'soft-silk',
    name: 'Kanchi Cotton',
    aliases: ['cotton saree', 'kanchi cotton saree'],
    note: 'Light, graceful, celebration ready',
    image:
      'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'organza',
    name: 'Others Fabrics',
    aliases: ['other fabrics', 'fabric saree'],
    note: 'Fresh florals and airy elegance',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
  },
];

const products = [
  {
    id: 7,
    category: 'banarasi',
    name: 'Handloom Kanjeevaram Zero Zari Kai Korvai Saree',
    price: 'Rs. 26,200',
    image: '/products/kai-korvai-1.jpeg',
    tag: 'Handloom Heritage',
    searchTerms: [
      'kanchipuram',
      'kanjeevaram',
      'kanjivaram',
      'saree',
      'sarees',
      'kai korvai',
      'zero zari',
      'handloom',
      'silk saree',
    ],
    description:
      'This saree brings together the elegance of a subtle checked body with a richly woven pallu that tells a story in stripes, motifs, and heritage textures. The contrast is intentional - minimal in the drape, expressive in the fall. The pallu carries intricate temple-inspired borders, geometric bands, and traditional motifs, woven in earthy tones of mustard, rust, green, and black - a palette deeply rooted in Indian handloom identity. Finished with classic tassels, every inch reflects the precision of loom craftsmanship.',
    gallery: [
      '/products/kai-korvai-1.jpeg',
      '/products/kai-korvai-2.jpeg',
      '/products/kai-korvai-3.jpeg',
      '/products/kai-korvai-4.jpeg',
      '/products/kai-korvai-5.jpeg',
      '/products/kai-korvai-6.jpeg',
      '/products/kai-korvai-7.jpeg',
      '/products/kai-korvai-8.jpeg',
      '/products/kai-korvai-9.jpeg',
    ],
  },
];

const reviews = [
  {
    name: 'Rashmi Nair',
    text: 'The saree looked even richer in person. The collection feels bright, refined, and beautifully curated.',
  },
  {
    name: 'Divya Iyer',
    text: 'This has the warmth of a traditional saree store with the polish of a premium online boutique.',
  },
  {
    name: 'Meera Srinivasan',
    text: 'My bridal purchase felt special from browsing to delivery. Elegant presentation and lovely details.',
  },
];

const aboutImages = [
  'https://images.unsplash.com/photo-1610041321327-b794da1f8f31?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1621786030484-4c855eed6974?auto=format&fit=crop&w=900&q=80',
];

const blogPosts = [
  {
    title: 'How To Choose The Perfect Bridal Kancheepuram Saree',
    category: 'Bridal Guide',
    image:
      'https://images.unsplash.com/photo-1621784563330-caee0b138a00?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'A bridal saree is more than attire. It becomes part of family memory. Discover how color, zari richness, and drape weight help create the perfect ceremonial presence.',
  },
  {
    title: 'Why Kanchi Cotton Is A Timeless Choice For Elegant Daywear',
    category: 'Fabric Story',
    image:
      'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Light, breathable, and beautifully graceful, Kanchi cotton sarees balance comfort with tradition, making them ideal for festive mornings, poojas, and intimate gatherings.',
  },
  {
    title: 'Styling Heritage Sarees With A Modern Luxury Finish',
    category: 'Style Journal',
    image:
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'From heirloom drapes to statement blouses and jewelry pairings, learn how to elevate traditional weaves with a polished boutique sensibility.',
  },
];

const serviceOptions = [
  { id: 'pico', label: 'Pico & Falls', price: 200 },
  { id: 'blouse', label: 'Blouse Stitching', price: 1500 },
  { id: 'tassel', label: 'Tassel', price: 0 },
];

const formatPrice = (amount) => `Rs. ${amount.toLocaleString('en-IN')}`;
const parsePrice = (price) => Number(price.replace(/[^0-9]/g, ''));
const enquiryEmail = 'novelsilks@gmail.com';
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const getApiUrl = (path) => (apiBaseUrl ? `${apiBaseUrl}${path}` : path);

const buildMailtoLink = ({ name, email, phone, enquiryType, message }) => {
  const subject = encodeURIComponent(`Website enquiry: ${enquiryType || 'General Enquiry'}`);
  const body = encodeURIComponent(
    [
      `Name: ${name || ''}`,
      `Email: ${email || ''}`,
      `Phone: ${phone || ''}`,
      `Enquiry Type: ${enquiryType || ''}`,
      '',
      'Message:',
      message || '',
    ].join('\n'),
  );

  return `mailto:${enquiryEmail}?subject=${subject}&body=${body}`;
};

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const policyPages = {
  shipping: {
    eyebrow: 'Our Policies',
    title: 'Shipping Policy',
    intro:
      'Our shipping policy is designed to keep delivery clear, dependable, and easy to follow for both domestic and international orders.',
    sections: [
      {
        heading: 'Shipping Charges',
        paragraphs: [
          'Shipping fees are calculated based on the weight of the order, destination, and delivery method selected at checkout.',
          'Domestic orders above Rs. 4,000 may qualify for complimentary shipping, subject to active store rules and serviceable locations.',
        ],
      },
      {
        heading: 'Delivery Partners',
        paragraphs: [
          'Domestic shipments are usually handled through India Post and trusted private courier partners.',
          'International deliveries may be fulfilled through carriers such as DHL, FedEx, UPS, or Aramex depending on the destination and service availability.',
        ],
      },
      {
        heading: 'Customs For International Orders',
        paragraphs: [
          'International orders may attract customs duties, import taxes, or local handling charges based on the destination country.',
          'Such charges, when applicable, are generally collected by the delivery partner at or before delivery and remain the responsibility of the customer.',
        ],
      },
      {
        heading: 'Order Tracking',
        paragraphs: [
          'Once an order is processed and shipped, tracking details are shared through email or order updates.',
          'Customers can also reach out to support for delivery status, shipment updates, and dispatch confirmation.',
        ],
      },
      {
        heading: 'Delivery Timelines',
        paragraphs: [
          'Domestic deliveries are typically completed within about 3 business days after dispatch, while international shipments may take up to 7 business days in standard cases.',
          'Transit times can vary due to courier operations, customs checks, public holidays, weather, or other circumstances outside store control.',
        ],
      },
    ],
  },
  returns: {
    eyebrow: 'Our Policies',
    title: 'Return & Exchange Policy',
    intro:
      'We understand that returns, exchanges, and cancellations sometimes become necessary, so this policy explains how those requests are handled.',
    sections: [
      {
        heading: 'Refund Eligibility',
        paragraphs: [
          'Refunds are considered after the returned product reaches us in saleable condition and passes quality checks.',
          'Approved refunds are generally processed back to the original payment source after deducting any applicable transaction or cancellation charges.',
        ],
      },
      {
        heading: 'Store Credit',
        paragraphs: [
          'Minor colour variation caused by screen settings is not usually treated as a defect and may instead be addressed through store credit.',
          'If a product is returned because it did not meet expectations and it is received back unused and saleable within the return window, store credit may be issued after review.',
        ],
      },
      {
        heading: 'Cancellation Window',
        paragraphs: [
          'Order cancellations should be requested within 24 hours of placing the order whenever possible.',
          'Once shipping has been initiated, cancellation may no longer be possible and an exchange or store credit route may be offered instead.',
        ],
      },
      {
        heading: 'Returns And Exchanges Are Not Accepted When',
        bullets: [
          'The original tags are removed or damaged.',
          'The blouse piece has been detached, cut, or stitched.',
          'Pico, falls, tassel work, embroidery, or other custom finishing has already been completed.',
          'The product has been used, altered, or damaged after delivery.',
          'The order was placed during special sale periods where cancellation or return restrictions apply.',
        ],
      },
      {
        heading: 'Damaged Or Incorrect Deliveries',
        paragraphs: [
          'If an order arrives damaged or incorrect, the issue should be reported immediately with clear supporting evidence so that the claim can be reviewed quickly.',
          'Where approved, replacement, exchange, refund, or shipping reimbursement may be offered based on the condition report and courier review.',
        ],
      },
    ],
  },
  terms: {
    eyebrow: 'Store Policies',
    title: 'Terms & Conditions',
    intro:
      'These terms explain the rules that apply when customers browse the website, place orders, use services, and interact with Noval Silks online.',
    sections: [
      {
        heading: 'Use Of The Website',
        paragraphs: [
          'By using this website, you agree to use it lawfully, provide accurate details, and avoid any activity that may disrupt the platform or affect other users.',
          'Use of the website and services is intended only for customers who are legally capable of entering into binding transactions under applicable law.',
        ],
      },
      {
        heading: 'Orders And Product Information',
        paragraphs: [
          'All orders placed through the website are treated as purchase requests and are subject to acceptance, stock availability, address verification, and payment confirmation.',
          'Customers are expected to review descriptions, customisation selections, finishing options, and pricing carefully before completing an order.',
        ],
      },
      {
        heading: 'Pricing And Payments',
        paragraphs: [
          'Prices displayed on the website may change without prior notice and are subject to applicable taxes, shipping fees, and promotional conditions.',
          'Payment details provided for transactions must be valid, accurate, and lawfully authorised by the customer making the purchase.',
        ],
      },
      {
        heading: 'Delivery Responsibility',
        paragraphs: [
          'Customers are responsible for providing a complete and accurate delivery address, contact details, and any information needed for successful fulfilment.',
          'We are not responsible for failed or delayed delivery caused by incorrect address details, recipient unavailability, or other customer-side issues.',
        ],
      },
      {
        heading: 'Limitation And Changes',
        paragraphs: [
          'Website content, policies, pricing, and service terms may be updated from time to time as business requirements change.',
          'To the fullest extent permitted by law, liability in relation to orders or website use is limited to the value of the relevant product or transaction.',
        ],
      },
    ],
  },
  privacy: {
    eyebrow: 'Store Policies',
    title: 'Privacy Policy',
    intro:
      'Your privacy matters to us. This page explains what information we collect, why we collect it, and how it is used while serving your orders and enquiries.',
    sections: [
      {
        heading: 'Information We Collect',
        paragraphs: [
          'We may collect your name, phone number, email address, delivery address, billing details, and order-related information when you browse, enquire, or place an order.',
          'Technical data such as device information, browsing behaviour, and usage patterns may also be collected to help improve website performance and customer experience.',
        ],
      },
      {
        heading: 'How We Use Information',
        paragraphs: [
          'Your information is used to process purchases, deliver orders, respond to enquiries, share updates, and support customer service requests.',
          'We may also use relevant information to improve website usability, protect transactions, and communicate important policy or order-related notices.',
        ],
      },
      {
        heading: 'Sharing And Protection',
        paragraphs: [
          'Customer information is shared only where necessary with payment providers, courier partners, service vendors, or when required by law.',
          'We take reasonable steps to safeguard personal information through secure processes, limited access, and trusted transaction systems.',
        ],
      },
      {
        heading: 'Marketing And Preferences',
        paragraphs: [
          'Promotional messages may be sent when customers opt in or when communication is relevant to their order or ongoing customer relationship.',
          'You may request to update, correct, or opt out of non-essential communications at any time by contacting customer support.',
        ],
      },
      {
        heading: 'Policy Updates',
        paragraphs: [
          'This privacy policy may be revised from time to time to reflect operational, legal, or service changes.',
          'Updated versions become effective when posted on the website.',
        ],
      },
    ],
  },
  faqs: {
    eyebrow: 'Help & Support',
    title: 'Frequently Asked Questions',
    intro:
      'These are some of the questions customers commonly ask before placing an order, choosing a saree, or checking delivery and account details.',
    faqs: [
      {
        question: 'Do I need an account to place an order?',
        answer:
          'Creating an account is recommended because it helps with faster checkout, order tracking, saved details, and easier access to favourites and purchase history.',
      },
      {
        question: 'Can I update my account details later?',
        answer:
          'Yes. Basic profile and account details can usually be updated through your account area after signing in.',
      },
      {
        question: 'What should I do if my payment fails?',
        answer:
          'Please contact customer support with your order or transaction details. Payment status can be checked and the next steps will be shared after review.',
      },
      {
        question: 'Is your payment system secure?',
        answer:
          'Yes. Payments are expected to be processed through secure systems designed to protect transaction information and maintain customer privacy.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Yes, international shipping can be offered for eligible products, subject to destination serviceability, courier availability, and customs regulations.',
      },
      {
        question: 'Is free shipping available?',
        answer:
          'Free domestic shipping may be available for qualifying orders above the current minimum value announced by the store.',
      },
    ],
  },
};

function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const [activeProductImage, setActiveProductImage] = useState(0);
  const [isCollectionsMenuOpen, setIsCollectionsMenuOpen] = useState(false);
  const [selectedServiceOption, setSelectedServiceOption] = useState(serviceOptions[0].id);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    note: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentFeedback, setPaymentFeedback] = useState({
    type: '',
    message: '',
  });
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: '',
    message: '',
  });
  const [contactFormStatus, setContactFormStatus] = useState({
    type: '',
    message: '',
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const visibleProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const categoryData = categories.find((category) => category.id === product.category);
    const categoryName = categoryData?.name ?? '';
    const categoryAliases = categoryData?.aliases?.join(' ') ?? '';
    const query = searchQuery.trim().toLowerCase();
    const searchHaystack = [
      product.name,
      categoryName,
      categoryAliases,
      product.tag,
      product.description,
      product.searchTerms?.join(' ') ?? '',
    ]
      .join(' ')
      .toLowerCase();
    const matchesSearch =
      query.length === 0 || searchHaystack.includes(query);

    return matchesCategory && matchesSearch;
  });

  const navigateTo = (hash) => {
    window.location.hash = hash;
  };

  const handleCollectionSelect = (categoryId, targetHash = '#collections-page') => {
    setSelectedCategory(categoryId);
    setIsCollectionsMenuOpen(false);
    navigateTo(targetHash);
  };

  const isAboutPage = currentHash === '#about-page';
  const isBlogPage = currentHash === '#blog-page';
  const isContactPage = currentHash === '#contact-page';
  const isCollectionsPage = currentHash === '#collections-page';
  const isCartPage = currentHash === '#cart-page';
  const isCheckoutPage = currentHash === '#checkout-page';
  const policyHashMatch = currentHash.match(/^#policy-([a-z-]+)$/);
  const activePolicyKey = policyHashMatch ? policyHashMatch[1] : null;
  const activePolicyPage = activePolicyKey ? policyPages[activePolicyKey] : null;
  const productHashMatch = currentHash.match(/^#product-(\d+)$/);
  const activeProduct = productHashMatch
    ? products.find((product) => product.id === Number(productHashMatch[1]))
    : null;
  const relatedProducts = activeProduct
    ? products.filter((product) => product.id !== activeProduct.id).slice(0, 4)
    : [];
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + (item.basePrice + item.optionPrice) * item.quantity,
    0,
  );
  const shippingCharge = cartSubtotal > 0 && cartSubtotal < 4000 ? 250 : 0;
  const paymentCharge = 0;
  const orderTotal = cartSubtotal + shippingCharge + paymentCharge;

  const serviceHighlights = [
    {
      label: 'Made In India',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 18h16" />
          <path d="M6 18V9l6-4 6 4v9" />
          <path d="M10 18v-5h4v5" />
        </svg>
      ),
    },
    {
      label: 'Easy Returns',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 8H5v-3" />
          <path d="M5 8a8 8 0 1 1-1 7" />
          <path d="M5 15a8 8 0 0 0 14 2" />
        </svg>
      ),
    },
    {
      label: 'Immediate Shipping',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 7h11v8H3z" />
          <path d="M14 10h3l3 3v2h-6z" />
          <circle cx="8" cy="17" r="2" />
          <circle cx="18" cy="17" r="2" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    setActiveProductImage(0);
    setSelectedServiceOption(serviceOptions[0].id);
  }, [currentHash]);

  const addToCart = (product, directCheckout = false) => {
    const selectedOption =
      serviceOptions.find((option) => option.id === selectedServiceOption) ?? serviceOptions[0];

    setCartItems((current) => {
      const existingItem = current.find(
        (item) => item.productId === product.id && item.optionId === selectedOption.id,
      );

      if (existingItem) {
        return current.map((item) =>
          item.productId === product.id && item.optionId === selectedOption.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...current,
        {
          id: `${product.id}-${selectedOption.id}`,
          productId: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          price: product.price,
          basePrice: parsePrice(product.price),
          optionId: selectedOption.id,
          optionLabel: selectedOption.label,
          optionPrice: selectedOption.price,
          quantity: 1,
        },
      ];
    });

    navigateTo(directCheckout ? '#checkout-page' : '#cart-page');
  };

  const updateCartQuantity = (itemId, nextQuantity) => {
    if (nextQuantity <= 0) {
      setCartItems((current) => current.filter((item) => item.id !== itemId));
      return;
    }

    setCartItems((current) =>
      current.map((item) =>
        item.id === itemId ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  };

  const removeCartItem = (itemId) => {
    setCartItems((current) => current.filter((item) => item.id !== itemId));
  };

  const handleCheckoutInput = (event) => {
    const { name, value } = event.target;
    setCheckoutForm((current) => ({ ...current, [name]: value }));
  };

  const handleSearchChange = (event) => {
    const nextValue = event.target.value;
    setSearchQuery(nextValue);

    if (nextValue.trim() && currentHash !== '#collections-page') {
      navigateTo('#collections-page');
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (searchQuery.trim()) {
      navigateTo('#collections-page');
    }
  };

  const handleContactFormInput = (event) => {
    const { name, value } = event.target;
    setContactFormData((current) => ({ ...current, [name]: value }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setContactFormStatus({
      type: '',
      message: '',
    });

    try {
      const response = await fetch(getApiUrl('/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactFormData),
      });

      const responseText = await response.text();
      let data = {};

      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error('The enquiry service is not available right now. Please try again in a moment.');
        }
      }

      if (!response.ok) {
        throw new Error(data.error || 'Unable to send your enquiry right now.');
      }

      setContactFormStatus({
        type: 'success',
        message: data.message,
      });
      setContactFormData({
        name: '',
        email: '',
        phone: '',
        enquiryType: '',
        message: '',
      });
    } catch (error) {
      const fallbackMailto = buildMailtoLink(contactFormData);

      setContactFormStatus({
        type: 'error',
        message:
          error.message === 'Failed to fetch'
            ? 'The enquiry service is not connected right now. Your mail app will open so you can send this message directly.'
            : error.message || 'Unable to send your enquiry right now.',
      });

      if (typeof window !== 'undefined') {
        window.location.href = fallbackMailto;
      }
    }
  };

  const handleRazorpayPayment = async () => {
    if (cartItems.length === 0) {
      setPaymentFeedback({
        type: 'error',
        message: 'Your cart is empty. Add the saree before proceeding to payment.',
      });
      return;
    }

    const requiredFields = [
      checkoutForm.fullName,
      checkoutForm.email,
      checkoutForm.phone,
      checkoutForm.address,
      checkoutForm.city,
      checkoutForm.state,
      checkoutForm.pincode,
    ];

    if (requiredFields.some((field) => !field.trim())) {
      setPaymentFeedback({
        type: 'error',
        message: 'Please complete your delivery details before continuing to payment.',
      });
      return;
    }

    setIsPaymentProcessing(true);
    setPaymentFeedback({
      type: '',
      message: '',
    });

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        throw new Error('Unable to load Razorpay checkout. Please try again.');
      }

      const orderResponse = await fetch(getApiUrl('/api/create-order'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: orderTotal * 100,
          currency: 'INR',
          receipt: `noval-${Date.now()}`,
          notes: {
            customerName: checkoutForm.fullName,
            customerPhone: checkoutForm.phone,
            preferredPaymentMethod: paymentMethod,
            productName: cartItems.map((item) => item.name).join(', '),
          },
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Unable to create payment order.');
      }

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        throw new Error('Razorpay Key ID is missing. Add it to your environment settings.');
      }

      const razorpayInstance = new window.Razorpay({
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Noval Silks',
        description: 'Premium saree order',
        image: '/noval-silks-logo.png',
        order_id: orderData.id,
        prefill: {
          name: checkoutForm.fullName,
          email: checkoutForm.email,
          contact: checkoutForm.phone,
        },
        notes: {
          address: `${checkoutForm.address}, ${checkoutForm.city}, ${checkoutForm.state} - ${checkoutForm.pincode}`,
        },
        theme: {
          color: '#8f2032',
        },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch(getApiUrl('/api/verify-payment'), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.verified) {
              throw new Error(verifyData.error || 'Payment verification failed.');
            }

            setCartItems([]);
            setPaymentFeedback({
              type: 'success',
              message: `Payment successful. Payment ID: ${response.razorpay_payment_id}`,
            });
            navigateTo('#home');
          } catch (error) {
            setPaymentFeedback({
              type: 'error',
              message: error.message || 'Payment verification failed.',
            });
          } finally {
            setIsPaymentProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsPaymentProcessing(false);
            setPaymentFeedback({
              type: 'error',
              message: 'Payment window was closed before completion.',
            });
          },
        },
      });

      razorpayInstance.on('payment.failed', (response) => {
        setIsPaymentProcessing(false);
        setPaymentFeedback({
          type: 'error',
          message:
            response.error?.description || 'Payment failed before completion. Please try again.',
        });
      });

      razorpayInstance.open();
    } catch (error) {
      setPaymentFeedback({
        type: 'error',
        message: error.message || 'Payment could not be started.',
      });
      setIsPaymentProcessing(false);
      return;
    }
  };

  return (
    <div className="page-shell">
      <div className="announcement-bar">
        Pure Silks | Bridal Sarees | Festive Collections | Boutique Luxury
      </div>

      <header className="site-header">
        <div className="header-inner">
          <a href="#home" className="brand-lockup" aria-label="Noval Silks home">
            <img src="/noval-silks-logo.png" alt="Noval Silks peacock logo" className="site-logo" />
            <div className="brand-copy">
              <span className="brand-name">NOVAL SILKS</span>
              <span className="brand-line">WOVEN HERITAGE . WORN WITH PRIDE</span>
            </div>
          </a>
          <form className="header-search" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search sarees, collections..."
              aria-label="Search products"
            />
          </form>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <div
              className="nav-dropdown"
              onMouseEnter={() => setIsCollectionsMenuOpen(true)}
              onMouseLeave={() => setIsCollectionsMenuOpen(false)}
            >
              <button
                type="button"
                className={isCollectionsMenuOpen ? 'nav-dropdown-trigger is-open' : 'nav-dropdown-trigger'}
                onClick={() => setIsCollectionsMenuOpen((current) => !current)}
                aria-expanded={isCollectionsMenuOpen}
                aria-haspopup="menu"
              >
                Collections
              </button>
              <div className={isCollectionsMenuOpen ? 'nav-dropdown-menu is-open' : 'nav-dropdown-menu'}>
                <button
                  type="button"
                  className="nav-dropdown-item"
                  onClick={() => handleCollectionSelect('all')}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category.id}
                    className="nav-dropdown-item"
                    onClick={() => handleCollectionSelect(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            <a href="#about-page">About</a>
            <a href="#blog-page">Blog</a>
            <a href="#contact-page">Contact</a>
            <button type="button" className="cart-nav-link" onClick={() => navigateTo('#cart-page')}>
              Cart
              <span>{cartCount}</span>
            </button>
          </nav>
        </div>
      </header>

      <main>
        {activeProduct ? (
          <>
            <section className="product-page" id={`product-${activeProduct.id}`}>
              <div className="product-page-grid">
                <div className="product-gallery">
                  <div className="product-gallery-main">
                    <img
                      src={activeProduct.gallery[activeProductImage]}
                      alt={activeProduct.name}
                      className="product-detail-main-image"
                    />
                  </div>
                  <div className="product-gallery-thumbs">
                    {activeProduct.gallery.map((image, index) => (
                      <button
                        type="button"
                        key={image}
                        className={index === activeProductImage ? 'product-thumb active' : 'product-thumb'}
                        onClick={() => setActiveProductImage(index)}
                      >
                        <img src={image} alt={`${activeProduct.name} view ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="product-summary-card">
                  <p className="eyebrow">
                    {categories.find((category) => category.id === activeProduct.category)?.name}
                  </p>
                  <h1>{activeProduct.name}</h1>
                  <strong className="product-page-price">{activeProduct.price}</strong>

                  <div className="product-options-box">
                    <p className="product-options-title">Choose Your Product Options</p>
                    {serviceOptions.map((option) => (
                      <label key={option.id}>
                        <input
                          type="radio"
                          name="service"
                          checked={selectedServiceOption === option.id}
                          onChange={() => setSelectedServiceOption(option.id)}
                        />
                        {option.label} ({option.price === 0 ? 'Free' : `INR ${option.price}`})
                      </label>
                    ))}
                  </div>

                  <div className="product-page-actions">
                    <button type="button" className="buy-btn" onClick={() => addToCart(activeProduct, true)}>Buy it now</button>
                    <button type="button" className="cart-btn" onClick={() => addToCart(activeProduct)}>Add to Cart</button>
                  </div>

                  <p className="product-page-note">
                    Created once in design, every saree is uniquely yours.
                  </p>

                  <div className="weave-story-card">
                    <div className="weave-story-icon">NS</div>
                    <p>
                      It takes about <strong>15 to 20 days</strong> to handweave a single Kanchipuram silk saree,
                      reflecting the artistry, patience, and dedication behind every drape.
                    </p>
                  </div>

                  <div className="product-service-strip">
                    {serviceHighlights.map((item) => (
                      <span className="service-pill" key={item.label}>
                        <i>{item.icon}</i>
                        {item.label}
                      </span>
                    ))}
                  </div>

                  <div className="product-detail-panels">
                    <details open>
                      <summary>Product Detail</summary>
                      <p>{activeProduct.description}</p>
                    </details>
                    <details>
                      <summary>Specification</summary>
                      <p>Premium weave, boutique finish, occasion-ready styling, and carefully curated craftsmanship.</p>
                    </details>
                    <details>
                      <summary>Wash Care</summary>
                      <p>Dry clean recommended to preserve silk texture, zari finish, and richness of color.</p>
                    </details>
                    <details>
                      <summary>Delivery Shipping</summary>
                      <p>Dispatch timelines vary by finishing options and availability. Boutique guidance available on request.</p>
                    </details>
                    <details>
                      <summary>Note</summary>
                      <p>Color appearance may slightly vary depending on device display and natural weave characteristics.</p>
                    </details>
                  </div>
                </div>
              </div>
            </section>

            {relatedProducts.length > 0 ? (
              <section className="related-products-section">
                <div className="section-heading">
                  <p className="eyebrow">People Also Bought</p>
                  <h2>Explore more boutique saree selections.</h2>
                </div>
                <div className="product-grid">
                  {relatedProducts.map((product) => (
                    <article className="product-card" key={product.id}>
                      <div className="product-image-wrap">
                        <img src={product.image} alt={product.name} />
                        <span className="product-tag">{product.tag}</span>
                      </div>
                      <div className="product-content">
                        <p className="product-category">
                          {categories.find((category) => category.id === product.category)?.name}
                        </p>
                        <h3>{product.name}</h3>
                        <div className="product-meta">
                          <strong>{product.price}</strong>
                          <button type="button" onClick={() => navigateTo(`#product-${product.id}`)}>View Details</button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </>
        ) : isCartPage ? (
          <>
            <section className="cart-page-hero" id="cart-page">
              <div className="cart-page-copy">
                <p className="eyebrow">Shopping Bag</p>
                <h1>Review your saree selection before checkout.</h1>
                <span>
                  Confirm styling options, update quantity, and proceed to secure payment with a refined boutique checkout flow.
                </span>
              </div>
            </section>

            <section className="cart-page-section">
              <div className="cart-page-grid">
                <div className="cart-items-panel">
                  {cartItems.length === 0 ? (
                    <div className="cart-empty-state">
                      <h2>Your cart is currently empty.</h2>
                      <p>Explore the collection and add your saree to begin checkout.</p>
                      <button type="button" className="ghost-btn" onClick={() => navigateTo('#collections-page')}>
                        Browse Collection
                      </button>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <article className="cart-item-card" key={item.id}>
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-copy">
                          <p className="product-category">
                            {categories.find((category) => category.id === item.category)?.name}
                          </p>
                          <h2>{item.name}</h2>
                          <p className="cart-item-option">
                            {item.optionLabel} {item.optionPrice > 0 ? `(+ ${formatPrice(item.optionPrice)})` : '(Included)'}
                          </p>
                          <strong>{formatPrice(item.basePrice + item.optionPrice)}</strong>
                        </div>
                        <div className="cart-item-controls">
                          <div className="quantity-control">
                            <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                          </div>
                          <button type="button" className="remove-item-btn" onClick={() => removeCartItem(item.id)}>
                            Remove
                          </button>
                        </div>
                      </article>
                    ))
                  )}
                </div>

                <aside className="cart-summary-card">
                  <p className="eyebrow">Order Summary</p>
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <strong>{formatPrice(cartSubtotal)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <strong>{shippingCharge === 0 ? 'Free' : formatPrice(shippingCharge)}</strong>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <strong>{formatPrice(cartSubtotal + shippingCharge)}</strong>
                  </div>
                  <button
                    type="button"
                    className="buy-btn checkout-btn"
                    disabled={cartItems.length === 0}
                    onClick={() => navigateTo('#checkout-page')}
                  >
                    Proceed to Checkout
                  </button>
                  <button type="button" className="cart-btn continue-btn" onClick={() => navigateTo('#collections-page')}>
                    Continue Shopping
                  </button>
                </aside>
              </div>
            </section>
          </>
        ) : isCheckoutPage ? (
          <>
            <section className="checkout-page-hero" id="checkout-page">
              <div className="checkout-page-copy">
                <p className="eyebrow">Secure Checkout</p>
                <h1>Complete your order with delivery and payment details.</h1>
                <span>
                  Inspired by premium saree-store checkout flows, this page brings together address details, payment choice, and order review in one elegant step.
                </span>
              </div>
            </section>

            <section className="checkout-page-section">
              <div className="checkout-page-grid">
                <div className="checkout-form-stack">
                  <div className="checkout-panel">
                    <p className="eyebrow">Delivery Address</p>
                    <div className="checkout-form-grid">
                      <input name="fullName" value={checkoutForm.fullName} onChange={handleCheckoutInput} placeholder="Full Name" aria-label="Full Name" />
                      <input name="email" value={checkoutForm.email} onChange={handleCheckoutInput} placeholder="Email Address" aria-label="Email Address" />
                      <input name="phone" value={checkoutForm.phone} onChange={handleCheckoutInput} placeholder="Phone Number" aria-label="Phone Number" />
                      <input name="city" value={checkoutForm.city} onChange={handleCheckoutInput} placeholder="City" aria-label="City" />
                      <input name="state" value={checkoutForm.state} onChange={handleCheckoutInput} placeholder="State" aria-label="State" />
                      <input name="pincode" value={checkoutForm.pincode} onChange={handleCheckoutInput} placeholder="Pincode" aria-label="Pincode" />
                      <textarea
                        name="address"
                        value={checkoutForm.address}
                        onChange={handleCheckoutInput}
                        rows="4"
                        placeholder="House / Street / Area"
                        aria-label="Address"
                      />
                      <textarea
                        name="note"
                        value={checkoutForm.note}
                        onChange={handleCheckoutInput}
                        rows="4"
                        placeholder="Order note or delivery instruction"
                        aria-label="Order note"
                      />
                    </div>
                  </div>

                  <div className="checkout-panel">
                    <p className="eyebrow">Payment Method</p>
                    <div className="payment-methods">
                      <label className={paymentMethod === 'upi' ? 'payment-method active' : 'payment-method'}>
                        <input type="radio" name="payment-method" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                        <span>UPI / QR Payment</span>
                      </label>
                      <label className={paymentMethod === 'card' ? 'payment-method active' : 'payment-method'}>
                        <input type="radio" name="payment-method" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                        <span>Credit / Debit Card</span>
                      </label>
                      <label className={paymentMethod === 'netbanking' ? 'payment-method active' : 'payment-method'}>
                        <input type="radio" name="payment-method" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} />
                        <span>Net Banking</span>
                      </label>
                    </div>
                  </div>
                </div>

                <aside className="checkout-summary-card">
                  <p className="eyebrow">Payment Summary</p>
                  <div className="checkout-order-list">
                    {cartItems.map((item) => (
                      <div className="checkout-order-item" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <div>
                          <strong>{item.name}</strong>
                          <span>{item.optionLabel}</span>
                          <span>Qty {item.quantity}</span>
                        </div>
                        <strong>{formatPrice((item.basePrice + item.optionPrice) * item.quantity)}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <strong>{formatPrice(cartSubtotal)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <strong>{shippingCharge === 0 ? 'Free' : formatPrice(shippingCharge)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Payment Charge</span>
                    <strong>{paymentCharge === 0 ? 'Nil' : formatPrice(paymentCharge)}</strong>
                  </div>
                  <div className="summary-row total">
                    <span>Total Payable</span>
                    <strong>{formatPrice(orderTotal)}</strong>
                  </div>
                  {paymentFeedback.message ? (
                    <p className={paymentFeedback.type === 'success' ? 'form-status success' : 'form-status error'}>
                      {paymentFeedback.message}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    className="buy-btn checkout-btn"
                    disabled={cartItems.length === 0 || isPaymentProcessing}
                    onClick={handleRazorpayPayment}
                  >
                    {isPaymentProcessing ? 'Opening Razorpay...' : 'Complete Payment'}
                  </button>
                  <button type="button" className="cart-btn continue-btn" onClick={() => navigateTo('#cart-page')}>
                    Back to Cart
                  </button>
                </aside>
              </div>
            </section>
          </>
        ) : activePolicyPage ? (
          <>
            <section className="policy-page-hero" id={`policy-${activePolicyKey}`}>
              <div className="policy-page-copy">
                <p className="eyebrow">{activePolicyPage.eyebrow}</p>
                <h1>{activePolicyPage.title}</h1>
                <span>{activePolicyPage.intro}</span>
              </div>
            </section>

            <section className="policy-page-section">
              <div className="policy-page-grid">
                <aside className="policy-side-nav">
                  <p className="eyebrow">Policy Pages</p>
                  <a href="#policy-shipping">Shipping Policy</a>
                  <a href="#policy-returns">Return &amp; Exchange Policy</a>
                  <a href="#policy-terms">Terms &amp; Conditions</a>
                  <a href="#policy-privacy">Privacy Policy</a>
                  <a href="#policy-faqs">FAQs</a>
                </aside>

                <div className="policy-content">
                  {activePolicyPage.sections?.map((section) => (
                    <article className="policy-section" key={section.heading}>
                      <h2>{section.heading}</h2>
                      {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.bullets ? (
                        <ul className="policy-list">
                          {section.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  ))}

                  {activePolicyPage.faqs ? (
                    <div className="policy-faq-list">
                      {activePolicyPage.faqs.map((item) => (
                        <article className="policy-faq-item" key={item.question}>
                          <h2>{item.question}</h2>
                          <p>{item.answer}</p>
                        </article>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          </>
        ) : isAboutPage ? (
          <>
            <section className="about-page-hero" id="about-page">
              <div className="about-page-copy">
                <p className="eyebrow">About Noval Silks</p>
                <h1>Celebrating heritage drapes with a boutique sense of luxury.</h1>
                <span>
                  Noval Silks is imagined as a destination for timeless sarees, premium craftsmanship,
                  and a shopping experience shaped by grace, warmth, and Indian tradition.
                </span>
              </div>
              <div className="about-page-image-wrap">
                <img src={aboutImages[0]} alt="Noval Silks heritage saree collection" className="about-page-image" />
              </div>
            </section>

            <section className="about-story-section">
              <div className="about-story-grid">
                <div className="about-story-card">
                  <p className="eyebrow">Our Story</p>
                  <h2>A premium saree house inspired by artistry, rituals, and celebration.</h2>
                  <p>
                    Noval Silks brings together the romance of silk, the beauty of zari, and the deep
                    emotional value of traditional drapes. Every saree is chosen to feel worthy of weddings,
                    festive gatherings, gifting moments, and the family occasions that stay in memory.
                  </p>
                  <p>
                    We believe luxury should not feel distant. It should feel warm, refined, and deeply personal,
                    with each collection presented in a way that is elegant, easy to explore, and rooted in culture.
                  </p>
                </div>
                <div className="about-story-stats">
                  <div className="about-stat">
                    <strong>Heritage</strong>
                    <span>Curated with respect for timeless Indian weaving traditions.</span>
                  </div>
                  <div className="about-stat">
                    <strong>Luxury</strong>
                    <span>Premium presentation, graceful textures, and rich occasion-led styling.</span>
                  </div>
                  <div className="about-stat">
                    <strong>Warmth</strong>
                    <span>A boutique experience designed to feel intimate and reassuring.</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="about-values-section">
              <div className="section-heading centered">
                <p className="eyebrow">Why Noval Silks</p>
                <h2>Designed for women who love tradition with a polished, luxury finish.</h2>
              </div>
              <div className="about-values-grid">
                <article className="about-value-card">
                  <h3>Curated Weaves</h3>
                  <p>From bridal Kancheepurams to softer festive fabrics, every edit is made with occasion and elegance in mind.</p>
                </article>
                <article className="about-value-card">
                  <h3>Premium Experience</h3>
                  <p>We present collections with clarity, softness, and richness so shopping feels calm, premium, and memorable.</p>
                </article>
                <article className="about-value-card">
                  <h3>Rooted In Pride</h3>
                  <p>Our identity celebrates woven heritage and the beauty of wearing tradition with confidence and joy.</p>
                </article>
              </div>
            </section>
          </>
        ) : isBlogPage ? (
          <>
            <section className="blog-page-hero" id="blog-page">
              <div className="blog-page-copy">
                <p className="eyebrow">Noval Silks Journal</p>
                <h1>Stories, styling notes, and saree inspirations with a luxury touch.</h1>
                <span>
                  Explore curated reads on bridal sarees, timeless fabrics, and elegant ways to wear
                  heritage drapes with confidence and grace.
                </span>
              </div>
            </section>

            <section className="blog-list-section">
              <div className="blog-grid">
                {blogPosts.map((post) => (
                  <article className="blog-card" key={post.title}>
                    <div className="blog-image-wrap">
                      <img src={post.image} alt={post.title} className="blog-image" />
                    </div>
                    <div className="blog-card-copy">
                      <p className="eyebrow">{post.category}</p>
                      <h2>{post.title}</h2>
                      <p>{post.excerpt}</p>
                      <button type="button" className="blog-read-btn">Read More</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : isContactPage ? (
          <>
            <section className="contact-page-hero" id="contact-page">
              <div className="contact-page-copy">
                <p className="eyebrow">Contact Noval Silks</p>
                <h1>We would love to help you find the perfect saree for your next special occasion.</h1>
                <span>
                  Reach out for bridal selections, boutique guidance, collection details, or personalized
                  assistance with festive and heritage saree choices.
                </span>
              </div>
            </section>

            <section className="contact-page-section">
              <div className="contact-grid">
                <div className="contact-info-panel">
                  <article className="contact-card">
                    <p className="eyebrow">Visit</p>
                    <h2>Our Boutique</h2>
                    <p>Plot No.2, Ground floor, Silver Spring Apartment</p>
                    <p>Vijaya Nagar 3rd Street, Sridevi Kupam, Valasaravakam, Chennai - 600087</p>
                  </article>
                  <article className="contact-card">
                    <p className="eyebrow">Call</p>
                    <h2>Speak With Us</h2>
                    <p>+91-9176243344</p>
                    <p>Mon - Sat, 10:00 AM to 7:00 PM</p>
                  </article>
                  <article className="contact-card">
                    <p className="eyebrow">Write</p>
                    <h2>Email Enquiries</h2>
                    <p>{enquiryEmail}</p>
                    <p>We reply with care and styling guidance.</p>
                  </article>
                </div>

                <div className="contact-form-panel">
                  <div className="contact-form-shell">
                    <p className="eyebrow">Enquiry Form</p>
                    <h2>Send us your requirement</h2>
                    <form className="contact-form" onSubmit={handleContactSubmit}>
                      <input
                        type="text"
                        name="name"
                        value={contactFormData.name}
                        onChange={handleContactFormInput}
                        placeholder="Your Name"
                        aria-label="Your Name"
                      />
                      <input
                        type="email"
                        name="email"
                        value={contactFormData.email}
                        onChange={handleContactFormInput}
                        placeholder="Email Address"
                        aria-label="Email Address"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={contactFormData.phone}
                        onChange={handleContactFormInput}
                        placeholder="Phone Number"
                        aria-label="Phone Number"
                      />
                      <select
                        name="enquiryType"
                        value={contactFormData.enquiryType}
                        onChange={handleContactFormInput}
                        aria-label="Select enquiry type"
                      >
                        <option value="" disabled>Select Enquiry Type</option>
                        <option>Bridal Sarees</option>
                        <option>Festive Sarees</option>
                        <option>Boutique Appointment</option>
                        <option>General Enquiry</option>
                      </select>
                      <textarea
                        name="message"
                        value={contactFormData.message}
                        onChange={handleContactFormInput}
                        rows="6"
                        placeholder="Tell us what you are looking for..."
                        aria-label="Your Message"
                      />
                      {contactFormStatus.message ? (
                        <p className={contactFormStatus.type === 'success' ? 'form-status success' : 'form-status error'}>
                          {contactFormStatus.message}
                        </p>
                      ) : null}
                      <button type="submit" className="contact-submit-btn">Send Enquiry</button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : isCollectionsPage ? (
          <>
            <section className="collections-page-hero" id="collections-page">
              <div className="collections-page-copy">
                <p className="eyebrow">All Collections</p>
                <h1>Browse every Noval Silks selection in one refined collection page.</h1>
                <span>
                  Discover bridal drapes, elegant festive weaves, lighter cottons, and statement occasion sarees curated with a premium boutique sensibility.
                </span>
              </div>
            </section>

            <section className="collections-filters-section">
              <div className="filter-row">
                <button
                  type="button"
                  className={selectedCategory === 'all' ? 'filter-chip active' : 'filter-chip'}
                  onClick={() => handleCollectionSelect('all', '#collections-page')}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category.id}
                    className={selectedCategory === category.id ? 'filter-chip active' : 'filter-chip'}
                    onClick={() => handleCollectionSelect(category.id, '#collections-page')}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              {visibleProducts.length === 0 ? (
                <div className="empty-state">
                  <p>No products found for "{searchQuery}". Try another search.</p>
                </div>
              ) : null}
              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-image-wrap">
                      <img src={product.image} alt={product.name} />
                      <span className="product-tag">{product.tag}</span>
                    </div>
                    <div className="product-content">
                      <p className="product-category">
                        {categories.find((category) => category.id === product.category)?.name}
                      </p>
                      <h3>{product.name}</h3>
                      <div className="product-meta">
                        <strong>{product.price}</strong>
                        <button type="button" onClick={() => navigateTo(`#product-${product.id}`)}>View Details</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="hero-section" id="home">
              <div className="slider-panel">
                {slides.map((slide, index) => (
                  <article
                    key={slide.title}
                    className={`slide ${index === activeSlide ? 'is-active' : ''}`}
                    style={{
                      backgroundImage: `linear-gradient(rgba(255, 252, 247, 0.06), rgba(88, 41, 24, 0.18)), url(${slide.image})`,
                    }}
                  />
                ))}

                <div className="slider-dots" aria-label="Slide controls">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.eyebrow}
                      type="button"
                      className={index === activeSlide ? 'dot active' : 'dot'}
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section className="feature-strip">
              <div>Exclusive Bridal Sarees</div>
              <div>Authentic Silk Weaves</div>
              <div>Pan India Delivery</div>
              <div>Personal Boutique Support</div>
            </section>

            <section className="about-section" id="about">
              <div className="about-grid">
                <div className="about-visuals">
                  <img src={aboutImages[0]} alt="Luxury silk saree drape" className="about-image about-image-large" />
                  <img src={aboutImages[1]} alt="Traditional saree styling detail" className="about-image about-image-small" />
                </div>
                <div className="about-copy">
                  <div className="section-heading">
                    <p className="eyebrow">About Novel Silks</p>
                    <h2>Tradition, elegance, and celebratory luxury in every weave.</h2>
                  </div>
                  <p>
                    Novel Silks is a saree destination shaped around the beauty of Indian craftsmanship. Our
                    collections celebrate silk, zari, color, and heritage with a polished and welcoming boutique feel.
                  </p>
                  <p>
                    The experience is designed to feel bright, graceful, and easy to browse, helping every visitor
                    discover sarees for weddings, festivals, gifting, and treasured family moments.
                  </p>
                </div>
              </div>
            </section>

            <section className="categories-section" id="collections">
              <div className="section-heading centered">
                <p className="eyebrow">Shop By Category</p>
                <h2>Explore timeless collections for every occasion.</h2>
              </div>
              <div className="category-grid">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category.id}
                    className={selectedCategory === category.id ? 'category-card active' : 'category-card'}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <img src={category.image} alt={category.name} />
                    <div className="category-card-copy">
                      <strong>{category.name}</strong>
                      <span>{category.note}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="products-section" id="products">
              <div className="section-heading centered">
                <p className="eyebrow">Featured Products</p>
                <h2>
                  {selectedCategory === 'all'
                    ? 'Curated sarees for festive elegance.'
                    : `Showing ${categories.find((category) => category.id === selectedCategory)?.name}`}
                </h2>
              </div>
              <div className="filter-row">
                <button
                  type="button"
                  className={selectedCategory === 'all' ? 'filter-chip active' : 'filter-chip'}
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category.id}
                    className={selectedCategory === category.id ? 'filter-chip active' : 'filter-chip'}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              {visibleProducts.length === 0 ? (
                <div className="empty-state">
                  <p>No products found for "{searchQuery}". Try another search.</p>
                </div>
              ) : null}
              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-image-wrap">
                      <img src={product.image} alt={product.name} />
                      <span className="product-tag">{product.tag}</span>
                    </div>
                    <div className="product-content">
                      <p className="product-category">
                        {categories.find((category) => category.id === product.category)?.name}
                      </p>
                      <h3>{product.name}</h3>
                      <div className="product-meta">
                        <strong>{product.price}</strong>
                        <button type="button" onClick={() => navigateTo(`#product-${product.id}`)}>View Details</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="reviews-section" id="reviews">
              <div className="section-heading centered">
                <p className="eyebrow">Customer Reviews</p>
                <h2>Loved for timeless weaves and an elevated shopping experience.</h2>
              </div>
              <div className="reviews-marquee">
                <div className="reviews-track">
                  {[...reviews, ...reviews].map((review, index) => (
                    <article className="review-card" key={`${review.name}-${index}`}>
                      <span className="quote-mark">"</span>
                      <p>{review.text}</p>
                      <strong>{review.name}</strong>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="footer" id="contact">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>Kanchipuram Sarees</h3>
            <a href="#collections-page">Bridal Kancheepuram</a>
            <a href="#collections-page">Other Kancheepuram</a>
            <a href="#collections-page">Kanchi Cotton</a>
            <a href="#collections-page">Others Fabrics</a>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#collections-page">Collections</a>
            <a href="#about-page">About Us</a>
            <a href="#blog-page">Blog</a>
          </div>

          <div className="footer-column">
            <h3>Customer Care</h3>
            <a href="#policy-shipping">Shipping &amp; Delivery Policy</a>
            <a href="#policy-returns">Return &amp; Exchange Policy</a>
            <a href="#policy-terms">Terms &amp; Conditions</a>
            <a href="#policy-privacy">Privacy Policy</a>
            <a href="#policy-faqs">FAQs</a>
          </div>

          <div className="footer-brand-panel">
            <img src="/noval-silks-logo.png" alt="Noval Silks peacock logo" className="footer-logo" />
            <div className="footer-brand-copy">
              <p className="footer-title">NOVAL SILKS</p>
              <p className="footer-copy">WOVEN HERITAGE . WORN WITH PRIDE</p>
            </div>
            <div className="footer-contact-lines">
              <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a>
              <a href="tel:+919176243344">+91-9176243344</a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Plot+No.2%2C+Ground+floor%2C+Silver+Spring+Apartment%2C+Vijaya+Nagar+3rd+Street%2C+Sridevi+Kupam%2C+Valasaravakam%2C+Chennai+-+600087"
                target="_blank"
                rel="noreferrer"
              >
                Plot No.2, Ground floor, Silver Spring Apartment, Vijaya Nagar 3rd Street, Sridevi Kupam, Valasaravakam, Chennai - 600087
              </a>
            </div>
            <p className="footer-follow-text">Get inspired - follow us!</p>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/novelsilks?igsh=MTkya2ZvZ2lxZ2Y4cQ=="
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.3" cy="6.7" r="1" />
                </svg>
              </a>
              <a href="#home" aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 8h2V4h-2c-2.2 0-4 1.8-4 4v2H8v4h2v6h4v-6h2.5l.5-4H14V8c0-.6.4-1 1-1z" />
                </svg>
              </a>
              <a href="#home" aria-label="YouTube">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 8.5a2.5 2.5 0 0 0-1.8-1.8C17.6 6.2 12 6.2 12 6.2s-5.6 0-7.2.5A2.5 2.5 0 0 0 3 8.5 26 26 0 0 0 2.5 12 26 26 0 0 0 3 15.5a2.5 2.5 0 0 0 1.8 1.8c1.6.5 7.2.5 7.2.5s5.6 0 7.2-.5a2.5 2.5 0 0 0 1.8-1.8 26 26 0 0 0 .5-3.5 26 26 0 0 0-.5-3.5z" />
                  <path d="m10 9 5 3-5 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © 2026 Noval Silks. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
