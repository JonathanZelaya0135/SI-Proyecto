import './DashboardCard.css'

export default function DashboardCard({ title, value, label }){
    return(
      <div className="dashboard-card">
        <h2 className="dashboard-card-title">{title}</h2>
        <p className="dashboard-card-value">{value}</p>
        <span className="dashboard-card-label">{label}</span>
      </div>
    );
};