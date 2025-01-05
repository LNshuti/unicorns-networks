# :unicorn: [Venture Unicorns Networks](https://injbaynpz2rgvlwx.vercel.app) 

## Analysis of VC-backed unicorns using CB Insights data of 09-21-2024

JavaScript mobile app built with React and deployed on Vercel. The app analyzes the relationships between venture capital firms, and invested companies and serves dual purposes: **for job hunters, it identifies companies with strong product-market fit backed by reputable investors** to target in their job search, while **for startup founders, it highlights which investors support competitors, enabling refined pitch strategies**. 

Built with V0, React.
 
#### Goals
1. Ensure compatibility across devices, especially mobile.
2. Enhance interactivity and usability by implementing advanced filtering and visualization capabilities.

#### User Goals
**Job Seekers:** Find high-growth companies with strong VC backing using filters such as valuation range, industry, or geography.
**Startup Founders:** Explore investor relationships and market competition using touch-friendly, dynamic graphs on mobile.

#### Non-Goals
Adding entirely new datasets or data sources beyond the existing scope.
Introducing server-side computation or backend-heavy architectures.

#### User Stories
- As a job hunter, I want to use filters like country, industry, and valuation range to identify high-potential companies backed by reputable investors.
- As a startup founder, I want to exclude certain competitors or industries to focus on VCs relevant to my pitch.
- As a business analyst, I want to visualize complex networks interactively and export filtered data.

#### Filters
**1. Inclusion Filters**
 * Country
 * Industry
 * Specific Companies
 * Select Investors

**2. Exclusion Filters**
 - Exclude Countries
 - Exclude Industries
 - Exclude Companies
 - Exclude Investors
 - Valuation Range (in billions)

**3. All**
 - 1–5
 - 5–10
 - 10–15
 - 15–20
 - 20+
