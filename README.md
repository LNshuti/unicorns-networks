# :unicorn: [Venture Unicorns Networks](https://mytpgveyvgm572kv.vercel.app) 

A **Unicorn** is a company valued by at least 1 Billion USD. I previously built a python [gradio](https://leoncensh-networkx-saas.hf.space) app that visualizes relationships between venture capital firms and invested companies. With this app, I was able to show the dominance of the top 5 Venture capital firms **Y Combinator, Accel, Venrock, and Andreeseen Horowitz** owning companies with an aggregate valuation exceeding **$500 Billion USD!** Although private valuation can be misleading, the dominance by a few investors, and a few firms is undeniable. Companies like **SpaceX, Bytedance(Ticktok) and Databricks** take a significant percentage of the value. 

Some limitations of the Python gradio app were that the app doesn't render well on Mobile, with the network diagrams overlapping too much, which led to a poor user experience. 

To solve this rendering issue, I built a new version using **React**, which renders much better on mobile. This app serves dual purposes:

1. **For job hunters, it identifies companies with strong product-market fit backed by reputable investors** to target in their job search
   
2. **For startup founders, it highlights which investors support competitors, enabling refined pitch strategies**. 

 
#### Goals
1. Ensure compatibility across devices, especially mobile.
2. Enhance interactivity and usability by implementing advanced filtering and visualization capabilities.


#### User Stories
- As a job hunter, I want to use filters **like country, industry, and valuation range** to identify high-potential companies backed by reputable investors.
- As a startup founder, I want to exclude certain competitors or industries to focus on VCs relevant to my pitch.
- As a business analyst, I want to visualize complex networks interactively and export filtered data.

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
     * 1–5
     * 5–10
     * 10–15
     * 15–20
     * 20+

#### Figure 1. Founders Fund US Portfolio

![image](https://github.com/user-attachments/assets/e10623ba-8bb7-4cd7-80c4-cfd3a4100b74)

#### Table 1. U.S Enterprise Tech 5-10 Billion CSV Export

<img width="762" alt="image" src="https://github.com/user-attachments/assets/37bdfe1c-616c-4bbf-8935-7978c36b08d3" />

