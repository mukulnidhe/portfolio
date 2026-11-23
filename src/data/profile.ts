// Single source of truth for all portfolio copy.
// Every fact here comes from Mukul Nidhe's resume (Nov 2026). Do not add numbers that are not on it.

export const profile = {
  name: 'Mukul Nidhe',
  title: 'Data Analyst | Business Analyst | Power BI Developer',
  experience: '3.7+ years',
  location: 'Navi Mumbai, Maharashtra, India',
  email: 'mn0624975@gmail.com',
  phone: '+91-7768880593',
  phoneHref: 'tel:+917768880593',
  linkedin: 'https://www.linkedin.com/in/mukulnidhe',
  linkedinLabel: 'linkedin.com/in/mukulnidhe',
  github: 'https://github.com/mukulnidhe',
  resume: './Mukul_Nidhe_Resume.pdf',
  summary:
    'Results-driven Data Analyst with 3.7+ years of experience in Power BI, SQL, Python and Advanced Excel — building dashboards, automating reporting and tracking the KPIs that leaders act on. I turn complex datasets into clear insights, understand what the business actually needs, and keep the numbers accurate end to end.',
  targetRoles: ['Data Analyst', 'Senior Data Analyst', 'Business Analyst', 'Power BI Developer', 'BI Analyst'],
  locations: ['Mumbai', 'Navi Mumbai', 'Pune', 'Bengaluru'],
}

export const heroStats = [
  { value: 3.7, decimals: 1, suffix: '+', label: 'Years of experience' },
  { value: 22, decimals: 0, suffix: '+', label: 'Business KPIs tracked' },
  { value: 358, decimals: 0, suffix: 'K+', label: 'Property records analysed' },
  { value: 1, decimals: 0, suffix: 'M+', label: 'Rows validated in a single run' },
]

export const aboutStrengths = [
  { icon: 'brain', title: 'Analytical thinking', text: 'Break a messy business question into measurable KPIs and testable answers.' },
  { icon: 'gauge', title: 'BI & reporting', text: 'Power BI dashboards, DAX measures and MIS reports that leadership uses every week.' },
  { icon: 'target', title: 'Business requirements', text: 'Translate stakeholder needs into data models, KPI definitions and report designs.' },
  { icon: 'presentation', title: 'Data storytelling', text: 'Visuals and narratives that make the next decision obvious, not just the last number.' },
  { icon: 'database', title: 'Large datasets', text: '358K+ property records and 1M+ row validation runs handled with Python and SQL.' },
  { icon: 'workflow', title: 'Automation', text: 'Replaced hours of manual list-building and checks with repeatable Python pipelines.' },
  { icon: 'messages', title: 'Stakeholder communication', text: 'Management-ready presentations for municipal leadership and strategy teams.' },
  { icon: 'lightbulb', title: 'Data to recommendations', text: 'From raw tables to prioritised actions — who to call, what to stock, where to focus.' },
] as const

export type Job = {
  company: string
  role: string
  period: string
  location: string
  context: string
  tools: string[]
  highlights: string[]
}

export const experience: Job[] = [
  {
    company: 'Foxberry Technology Pvt. Ltd.',
    role: 'Data Analyst',
    period: 'Nov 2025 – Present',
    location: 'Navi Mumbai, Maharashtra',
    context: 'Property Tax Department — Navi Mumbai Municipal Corporation (NMMC)',
    tools: ['Power BI (DAX)', 'Python', 'Pandas', 'NumPy', 'SQL', 'Jupyter', 'Advanced Excel', 'LightGBM', 'Scikit-learn'],
    highlights: [
      'Architected an end-to-end property tax analytics platform using Python and SQL, tracking 22+ KPIs across ~358K+ property records to expose defaulters, payment trends and revenue gaps.',
      'Engineered Python data validation tools that cross-check payment links and mobile numbers, processing 10+ lakh (1M+) rows in a single run.',
      'Automated ward-wise defaulter list generation in Python/Jupyter from the outstanding data source — removing hours of manual work and speeding up recovery reporting.',
      'Built interactive Power BI dashboards with DAX measures and KPI cards for property-wise collections, outstanding dues, ward-wise pending amounts and fiscal-year performance.',
      'Segmented payers (Regular, Semi-Regular, Irregular, Defaulter) and applied basic ML (classification, clustering, forecasting) to pinpoint high-priority recovery segments.',
      'Developed a LightGBM payment-prediction model (tuned with Optuna; evaluated on AUC, Gini, KS and cross-validation) to generate prioritised lists for SMS and WhatsApp campaigns.',
      'Optimised SQL to extract, clean and transform multi-source data, and translated business requirements into KPIs, dashboards and management-ready presentations.',
    ],
  },
  {
    company: 'Coffee Day Global Pvt. Ltd.',
    role: 'Executive IT – Data Analyst (Strategy)',
    period: 'May 2023 – Nov 2025',
    location: 'Bengaluru, Karnataka',
    context: 'Strategy team — dining and home-delivery business',
    tools: ['Power BI', 'SQL', 'MySQL Workbench', 'Python', 'Advanced Excel', 'MIS Reporting'],
    highlights: [
      'Developed interactive Power BI dashboards on SQL databases, turning raw data into KPIs and visual stories that drove strategic initiatives.',
      'Produced monthly cross-functional MIS reports combining Dining and Home-Delivery sales data for planning and performance reviews.',
      'Delivered strategic insights by extracting, transforming and analysing complex datasets with SQL, Python and Power BI.',
      'Ensured 100% data accuracy through variance analysis and SQL query debugging in MySQL Workbench.',
      'Strengthened data integrity with cleaning and normalisation, working closely with business and IT teams.',
    ],
  },
]

export type Project = {
  slug: string
  title: string
  tag: string
  date: string
  tools: string[]
  headline: string
  overview: string
  problem: string
  objectives: string[]
  approach: string[]
  findings: string[]
  recommendations: string[]
  impact: { value: string; label: string }[]
  visual: 'weekend' | 'rfm' | 'retail' | 'forecast'
}

export const projects: Project[] = [
  {
    slug: 'ecommerce-eda',
    title: 'E-commerce Exploratory Data Analysis',
    tag: 'Python',
    date: 'Jan 2023',
    tools: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    headline: '65% of sales happened on weekends',
    overview: 'Exploratory analysis of an e-commerce transaction dataset to understand what drives customer purchases and when they happen.',
    problem: 'Marketing effort was spread evenly across the week without evidence of when customers actually buy or which categories carry revenue.',
    objectives: ['Clean and profile the transaction data', 'Find purchasing patterns by category and time', 'Give marketing a sharper targeting focus'],
    approach: [
      'Cleaned and analysed 30K+ transaction records with Pandas and NumPy.',
      'Profiled category-wise revenue and order frequency.',
      'Compared weekday vs. weekend sales and visualised trends with Matplotlib.',
    ],
    findings: ['65% of sales occurred on weekends.', 'Revenue and order frequency differ clearly by category, pointing to where demand concentrates.'],
    recommendations: ['Concentrate campaigns and offers on weekends.', 'Prioritise the categories that lead revenue in targeting.'],
    impact: [
      { value: '30K+', label: 'transactions analysed' },
      { value: '65%', label: 'of sales on weekends' },
    ],
    visual: 'weekend',
  },
  {
    slug: 'churn-rfm',
    title: 'Churn Prediction & Customer Insights',
    tag: 'SQL',
    date: 'Mar 2024',
    tools: ['SQL', 'Joins', 'Subqueries', 'Window functions', 'RFM'],
    headline: 'Top 20% churn-risk customers identified',
    overview: 'SQL-driven customer analysis to spot who is about to stop buying and what to do about it.',
    problem: 'The business could not see which customers were drifting away until they had already gone.',
    objectives: ['Score every customer on purchase behaviour', 'Isolate the highest churn-risk group', 'Recommend retention actions'],
    approach: [
      'Queried 120K+ customer purchase records using joins, subqueries and window functions.',
      'Built RFM (Recency, Frequency, Monetary) scores for each customer.',
      'Segmented customers by RFM score to flag churn risk.',
    ],
    findings: ['The top 20% churn-risk customers were identified for targeted action.'],
    recommendations: ['Run retention campaigns aimed at the high-risk segment.'],
    impact: [
      { value: '120K+', label: 'purchase records' },
      { value: '20%', label: 'flagged as churn risk' },
      { value: '+10%', label: 'customer re-engagement' },
    ],
    visual: 'rfm',
  },
  {
    slug: 'retail-insights',
    title: 'Retail Insights Dashboard',
    tag: 'Power BI',
    date: 'Feb 2024',
    tools: ['Power BI', 'DAX', 'Data modelling'],
    headline: 'Excess stock cut by 22% in two quarters',
    overview: 'An interactive Power BI dashboard giving leadership one view of store and SKU performance by category and region.',
    problem: 'Leadership lacked a single view of performance across 350 stores, so slow-moving stock and declining lines were hard to spot.',
    objectives: ['Show KPIs by category and region', 'Track margins, stock turnover and YoY trends', 'Surface slow-moving inventory'],
    approach: [
      'Modelled data for 350 stores and 300+ SKUs.',
      'Wrote DAX measures for profit margin, stock turnover and YoY trends.',
      'Built category-wise and regional drill-downs.',
    ],
    findings: ['A 15% drop was highlighted in specific product lines.', 'Slow-moving items became visible by store and region.'],
    recommendations: ['Act on slow-moving SKUs to reduce excess stock.', 'Review the declining product lines.'],
    impact: [
      { value: '350', label: 'stores covered' },
      { value: '300+', label: 'SKUs analysed' },
      { value: '−22%', label: 'excess stock in two quarters' },
    ],
    visual: 'retail',
  },
  {
    slug: 'sales-forecast',
    title: 'Sales Dashboard & Forecasting',
    tag: 'Advanced Excel',
    date: 'Feb 2023',
    tools: ['Advanced Excel', 'Pivot tables', 'VLOOKUP', 'XLOOKUP', 'Linear regression'],
    headline: 'Next-quarter forecast at 93% accuracy',
    overview: 'A dynamic Excel dashboard and regression forecast for monthly sales across regions and products.',
    problem: 'Inventory planning relied on guesswork, leading to gaps between stock and demand.',
    objectives: ['Visualise revenue, units and growth', 'Forecast next-quarter sales', 'Support inventory planning'],
    approach: [
      'Analysed 15K+ monthly sales records across 4 regions and 12 products.',
      'Built pivot tables, VLOOKUP/XLOOKUP, conditional formatting and charts.',
      'Applied linear regression to forecast next-quarter sales.',
    ],
    findings: ['Next-quarter sales were forecast with 93% accuracy.'],
    recommendations: ['Use the forecast to plan stock by region and product.'],
    impact: [
      { value: '15K+', label: 'monthly sales records' },
      { value: '93%', label: 'forecast accuracy' },
      { value: '−18%', label: 'inventory gaps' },
    ],
    visual: 'forecast',
  },
]

export const skillGroups = [
  { id: 'bi', name: 'Business Intelligence', icon: 'gauge', skills: ['Power BI', 'DAX', 'Data Modeling', 'Power Query', 'KPI Reporting', 'MIS Reporting'] },
  { id: 'py', name: 'Programming & Analytics', icon: 'code', skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter Notebook', 'EDA', 'Statistical Analysis', 'Forecasting'] },
  { id: 'db', name: 'Databases', icon: 'database', skills: ['SQL', 'MySQL', 'Joins', 'Subqueries', 'Window Functions', 'Query Optimization'] },
  { id: 'ba', name: 'Business Analysis', icon: 'target', skills: ['Requirement Gathering', 'Business Intelligence', 'Variance Analysis', 'Trend Analysis', 'Customer Segmentation', 'Stakeholder Reporting'] },
  { id: 'other', name: 'Other Tools', icon: 'layers', skills: ['Advanced Excel', 'Azure', 'Azure DevOps', 'Basic Machine Learning', 'LightGBM', 'Scikit-learn'] },
] as const

// Where each skill shows up on the resume — an honest "evidence" indicator instead of made-up percentages.
export const skillEvidence: Record<string, string[]> = {
  'Power BI': ['Foxberry', 'Coffee Day', 'Retail Insights'],
  DAX: ['Foxberry', 'Retail Insights'],
  'Data Modeling': ['Foxberry', 'Retail Insights'],
  'Power Query': ['Skill set'],
  'KPI Reporting': ['Foxberry', 'Coffee Day'],
  'MIS Reporting': ['Coffee Day'],
  Python: ['Foxberry', 'Coffee Day', 'E-commerce EDA'],
  Pandas: ['Foxberry', 'E-commerce EDA'],
  NumPy: ['Foxberry', 'E-commerce EDA'],
  Matplotlib: ['E-commerce EDA'],
  'Jupyter Notebook': ['Foxberry'],
  EDA: ['E-commerce EDA'],
  'Statistical Analysis': ['Skill set'],
  Forecasting: ['Foxberry', 'Sales Forecasting'],
  SQL: ['Foxberry', 'Coffee Day', 'Churn & RFM'],
  MySQL: ['Coffee Day'],
  Joins: ['Churn & RFM'],
  Subqueries: ['Churn & RFM'],
  'Window Functions': ['Churn & RFM'],
  'Query Optimization': ['Foxberry'],
  'Requirement Gathering': ['Foxberry'],
  'Business Intelligence': ['Foxberry', 'Coffee Day'],
  'Variance Analysis': ['Coffee Day'],
  'Trend Analysis': ['Foxberry', 'Retail Insights'],
  'Customer Segmentation': ['Foxberry', 'Churn & RFM'],
  'Stakeholder Reporting': ['Foxberry', 'Coffee Day'],
  'Advanced Excel': ['Foxberry', 'Coffee Day', 'Sales Forecasting'],
  Azure: ['Udemy certification'],
  'Azure DevOps': ['Skill set'],
  'Basic Machine Learning': ['Foxberry'],
  LightGBM: ['Foxberry'],
  'Scikit-learn': ['Foxberry'],
}

export const whyMe = [
  { title: 'Business-first analysis', proof: 'Starts from the decision — recovery planning, stock levels, campaign focus — not from the chart.' },
  { title: 'Strong SQL & data wrangling', proof: 'Joins, subqueries, window functions and optimised multi-source extraction.' },
  { title: 'Advanced Power BI', proof: 'DAX measures, data models and KPI dashboards used by municipal and strategy leadership.' },
  { title: 'Python reporting automation', proof: 'Ward-wise defaulter lists generated automatically instead of by hand.' },
  { title: 'Large-scale datasets', proof: '358K+ property records; 1M+ rows validated in a single run.' },
  { title: 'KPI design & monitoring', proof: '22+ KPIs defined and tracked for property tax performance.' },
  { title: 'Problem solving', proof: 'Payer segmentation and a LightGBM model to prioritise who to contact first.' },
  { title: 'Accuracy you can trust', proof: '100% data accuracy through variance analysis and SQL debugging.' },
  { title: 'Reporting & storytelling', proof: 'Monthly MIS packs and management-ready presentations.' },
  { title: 'Bridges business and tech', proof: 'Turns stakeholder requirements into data models, KPIs and dashboards.' },
]

export const education = {
  degree: 'B.Tech in Mechanical Engineering',
  school: 'CSMSS College of Engineering, Maharashtra',
  period: '2019 – 2022',
  grade: 'CGPA 8.37',
}

export const certifications = [
  { name: 'Advanced Certification in Data Analytics with Generative AI', issuer: 'Coding Ninjas', year: '2025' },
  { name: 'Azure Data Engineer and Analyst', issuer: 'Udemy', year: '2026' },
]
