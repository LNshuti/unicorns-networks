# :unicorn: [Venture Unicorns Networks](https://jsuwyvjtb69oziys.vercel.app) 

A **Unicorn** is a company valued by at least 1 Billion USD. I built a python [gradio](https://leoncensh-networkx-saas.hf.space) app that visualizes the relationships between venture capital firms and invested companies using CB Insights Data from September 2024. I was able to show the dominance of the top 5 Venture capital firms **Y Combinator, Accel, Venrock, and Andreeseen Horowitz** owning companies with an aggregate valuation > **$500 Billion USD!**  Private valuation can be misleading because unicorns routinely go bankrupt(for example Convoy), investors might be slow to "mark down their investment value" if the value of the company has recently dropped. No one likes to look bad, and this is not enforced in private markets as it is in public markets where the value of a company follows closely its listed price on stock indices. The key takeaway from this data visualization exercise is that **few firms both on the investor and company side dominate most sectors. Companies like SpaceX, Bytedance(Ticktok) and Databricks** make up a significant fraction of all private companies in terms of market value. 


Some limitations of the Python gradio app were that the app doesn't render well on Mobile, with the network diagrams overlapping too much, which led to a poor user experience. 

To solve this rendering issue, I built a new version using **React**, which renders much better on mobile. This app serves dual purposes:

1. **For job hunters, it identifies companies with strong product-market fit backed by reputable investors** to target in their job search
   
2. **For startup founders, it highlights which investors support competitors, enabling refined pitch strategies**. 

**Inclusion and Exclusion Filters**
 * Country
 * Industry
 * Companies
 * Investors
 * Valuation Range (in billions)
     * 1–5
     * 5–10
     * 10–15
     * 15–20
     * 20+

#### Figure 1. San Francisco Unicorns

![image](https://github.com/user-attachments/assets/89b43731-56e9-4498-bfe1-5752f86008a1)


#### Figure 2. U.S Unicorns and the Power Law

![image](https://github.com/user-attachments/assets/5f3dc566-0527-4d8d-9d44-574588f54fa1)




