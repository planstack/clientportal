import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';

interface Plan {
  id: string;
  name: string;
  recordkeeper: string;
  participants: number;
  notices: number;
  status: 'Active' | 'Archived';
}

const Dashboard: React.FC<{ title: string }> = ({ title }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const plansPerPage = 10;

  const plans: Plan[] = [
    { id: 'PN-1294', name: 'Acme Corp 401(k) Retirement Plan', recordkeeper: 'Fidelity', participants: 1500, notices: 3, status: 'Active' },
    { id: 'TR-5678', name: 'TechStart Inc. 401(k) Plan', recordkeeper: 'Equitable', participants: 300, notices: 1, status: 'Active' },
    { id: '123456', name: 'Global Industries Pension Plan', recordkeeper: 'Lincoln', participants: 5000, notices: 5, status: 'Active' },
    { id: 'FN-9876', name: 'SmallBiz LLC 401(k) Savings Plan', recordkeeper: 'American Trust', participants: 50, notices: 0, status: 'Archived' },
    { id: 'AB-1234', name: 'Tech Innovators 403(b) Plan', recordkeeper: 'Fidelity', participants: 800, notices: 2, status: 'Active' },
  ];

  const filteredPlans = useMemo(() => {
    return plans.filter(plan => 
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === 'all' || plan.status.toLowerCase() === activeTab.toLowerCase())
    );
  }, [plans, searchTerm, activeTab]);

  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan);
  const totalPages = Math.ceil(filteredPlans.length / plansPerPage);

  const getRecordkeeperColor = (recordkeeper: string) => {
    const colors: { [key: string]: string } = {
      'Fidelity': 'primary',
      'Equitable': 'success',
      'Lincoln': 'danger',
      'American Trust': 'warning',
    };
    return colors[recordkeeper] || 'secondary';
  };

  const getCounts = useMemo(() => {
    const allCount = plans.length;
    const activeCount = plans.filter(p => p.status === 'Active').length;
    const archivedCount = plans.filter(p => p.status === 'Archived').length;
    return { allCount, activeCount, archivedCount };
  }, [plans]);

  const handleRowClick = (planId: string) => {
    router.push(`/plan/${planId}`);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid">
      <div className="dashboard-header">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <h1 className="h2 plans-title">{title}</h1>
        </div>

        <div className="mb-4">
          <input 
            type="text" 
            className="form-control search-bar" 
            placeholder="Search plans..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="simple-tabs-container">
          <div className="simple-tabs">
            <button 
              className={`tab-button ${activeTab === 'all' ? 'active' : ''}`} 
              onClick={() => setActiveTab('all')}
            >
              All Plans ({getCounts.allCount})
            </button>
            <button 
              className={`tab-button ${activeTab === 'active' ? 'active' : ''}`} 
              onClick={() => setActiveTab('active')}
            >
              Active ({getCounts.activeCount})
            </button>
            <button 
              className={`tab-button ${activeTab === 'archived' ? 'active' : ''}`} 
              onClick={() => setActiveTab('archived')}
            >
              Archived ({getCounts.archivedCount})
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>PLAN ID</th>
                <th>PLAN NAME</th>
                <th>RECORDKEEPER</th>
                <th>PARTICIPANTS</th>
                <th>NOTICES</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {currentPlans.map(plan => (
                <tr 
                  key={plan.id} 
                  onClick={() => handleRowClick(plan.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{plan.id}</td>
                  <td>{plan.name}</td>
                  <td>
                    <span className={`badge badge-recordkeeper bg-${getRecordkeeperColor(plan.recordkeeper)}`}>
                      {plan.recordkeeper}
                    </span>
                  </td>
                  <td>{plan.participants.toLocaleString()}</td>
                  <td>{plan.notices}</td>
                  <td>
                    <span className={`badge status-badge bg-${plan.status === 'Active' ? 'success' : 'secondary'}`}>
                      {plan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4 pagination-container">
        <div className="page-info">
          Showing {indexOfFirstPlan + 1} to {Math.min(indexOfLastPlan, filteredPlans.length)} of {filteredPlans.length} results
        </div>
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-outline-primary me-2" 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <span className="me-2 page-info">Page {currentPage} of {totalPages}</span>
          <button 
            className="btn btn-outline-primary" 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;