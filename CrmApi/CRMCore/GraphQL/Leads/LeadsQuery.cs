using CRMCore.Application.Dto.Leads;
using CRMCore.Application.Interface.Leads;
using System.ComponentModel.DataAnnotations;

namespace CRMCore.Web.GraphQL.Leads
{
    [ExtendObjectType("Query")]
    public class LeadsQuery
    {
        public IEnumerable<LeadVM> GetLeads([Service] ILeadRepository ILead)
        {
            return ILead.GetLeads().ToList();
        }

        public IEnumerable<LeadVM> GetLeadsByTenant([Service] ILeadRepository ILead, [Required] int tenantId)
        {
            return ILead.GetLeadsByTenant(tenantId).ToList();
        }

        public IEnumerable<LeadVM> GetLeadsByTenantAdmin([Service] ILeadRepository ILead, [Required] int tenantId)
        {
            return ILead.GetLeadsByTenantAdmin(tenantId).ToList();
        }

        public IEnumerable<LeadVM> GetLeadsByUser([Service] ILeadRepository ILead, [Required] int userId)
        {
            return ILead.GetLeadsByUser(userId).ToList();
        }
    }
}
