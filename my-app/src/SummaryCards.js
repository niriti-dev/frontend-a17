import SummaryStat  from "./SummaryStat";
const dashboardStats = [
    { title: "Total Manuscripts", value: 234 },
    { title: "Drafts", value: 56 },
    { title: "Under Review", value: 87 },
    { title: "Avg Turnaround", value: "7 days" }
  ];
  
  function SummaryCards() {
    return (
      <div className="cards">
        {dashboardStats.map((stat, index) => (
          <SummaryStat key={index} title={stat.title} value={stat.value} />
        ))}
      </div> 
    );
  }

  export default SummaryCards
  