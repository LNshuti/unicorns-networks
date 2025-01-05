# :unicorn: [Venture Unicorns Networks](https://injbaynpz2rgvlwx.vercel.app) 

## Analysis of VC-backed unicorns using CB Insights data of 09-21-2024

JavaScript mobile app built with React and deployed on Vercel. The app analyzes the relationships between venture capital firms, and invested companies and serves dual purposes: **for job hunters, it identifies companies with strong product-market fit backed by reputable investors** to target in their job search, while **for startup founders, it highlights which investors support competitors, enabling refined pitch strategies**. 

Built with V0, React.
 
#### Goals
1. Ensure compatibility across devices, especially mobile.
2. Enhance interactivity and usability by implementing advanced filtering and visualization capabilities.

#### User Goals
1. **Job Seekers:** Find high-growth companies with strong VC backing using filters such as valuation range, industry, or geography.
2. **Startup Founders:** Explore investor relationships and market competition using touch-friendly, dynamic graphs on mobile.

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

#### Figure 1. Founders Fund US Portfolio

![image](https://github.com/user-attachments/assets/e10623ba-8bb7-4cd7-80c4-cfd3a4100b74)

#### Table 1. U.S Enterprise Tech 5-10 Billion

Name	Valuation	Date	Country	City	Industry	Investors
Navan	9.2	11/8/18	United States	Palo Alto	Enterprise Tech	Andreessen Horowitz;Lightspeed Venture Partners;Zeev Ventures
VAST Data	9.1	4/16/20	United States	New York	Enterprise Tech	Norwest Venture Partners;Goldman Sachs;Dell Technologies Capital
Tanium	9	3/31/15	United States	Kirkland	Enterprise Tech	Andreessen Horowitz;Nor-Cal Invest;TPG Growth
Tipalti	8.3	10/6/20	United States	San Mateo	Enterprise Tech	01 Advisors;Zeev Ventures;Group 11
Ramp	7.65	3/29/21	United States	New York	Enterprise Tech	D1 Capital Partners;Stripe;Coatue Management
Netskope	7.5	11/13/18	United States	Santa Clara	Enterprise Tech	Lightspeed Venture Partners;Social Capital;Accel
Snyk	7.4	1/21/20	United States	Boston	Enterprise Tech	BOLDstart Ventures;Google Ventures;Accel
Gong	7.25	8/12/20	United States	Palo Alto	Enterprise Tech	Norwest Venture Partners;Next World Capital;Wing Venture Capital
ConsenSys	7	11/17/21	United States	New York	Enterprise Tech	Third Point;Electric Capital;Coinbase Ventures
Automation Anywhere	6.8	7/2/18	United States	San Jose	Enterprise Tech	General Atlantic;Goldman Sachs;New Enterprise Associates
DataRobot	6.3	7/29/19	United States	Boston	Enterprise Tech	New Enterprise Associates;Accomplice;IA Ventures
Black Unicorn Factory	6.1	5/20/21	United States	Los Angeles	Enterprise Tech	Barter Ventures
Grafana Labs	6	3/25/21	United States	New York	Enterprise Tech	Lightspeed Venture Partners;Lead Edge Capital;Coatue Management
6Sense	5.2	3/30/21	United States	San Francisco	Enterprise Tech	Venrock;Battery Ventures;Insight Partners
Attentive	5.99	9/23/20	United States	Hoboken	Enterprise Tech	NextView Ventures;Eniac Ventures;Sequoia Capital
Workato	5.7	1/12/21	United States	Mountain View	Enterprise Tech	Battery Ventures;Storm Ventures;Redpoint Ventures
Postman	5.6	6/11/20	United States	San Francisco	Enterprise Tech	Nexus Venture Partners;CRV;Insight Partners
FiveTran	5.6	6/30/20	United States	Oakland	Enterprise Tech	Matrix Partners;Andreessen Horowitz;General Catalyst
Safe Superintelligence	5	9/4/24	United States	San Francisco	Enterprise Tech	Sequoia Capital;DST Global;Andreessen Horowitz
Abnormal Security	5.1	5/10/22	United States	San Francisco	Enterprise Tech	Greylock Partners;Insight Partners;Menlo Ventures
SambaNova Systems	5	4/13/21	United States	Palo Alto	Enterprise Tech	Walden International;Google Ventures;Intel Capital
Cockroach Labs	5	1/12/21	United States	New York	Enterprise Tech	Google Ventures;Benchmark;FirstMark Capital
Icertis	5	7/17/19	United States	Bellevue	Enterprise Tech	Eight Roads Ventures;Greycroft;Ignition Partners<img width="762" alt="image" src="https://github.com/user-attachments/assets/37bdfe1c-616c-4bbf-8935-7978c36b08d3" />

