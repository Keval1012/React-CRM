using CRMCore.Application.Dto.Opportunities;
using CRMCore.Application.Interface.Opportunities;
using System.ComponentModel.DataAnnotations;

namespace CRMCore.Web.GraphQL.Opportunities
{
    [ExtendObjectType("Query")]
    public class OpportunitiesQuery
    {
        public IEnumerable<OpportunityVM> GetOpportunities([Service] IOpportunityRepository IOpportunity)
        {
            return IOpportunity.GetOpportunities().ToList();
        }

        public IEnumerable<OpportunityVM> GetOpportunitiesByTenant([Service] IOpportunityRepository IOpportunity, [Required] int tenantId)
        {
            return IOpportunity.GetOpportunitiesByTenant(tenantId).ToList();
        }

        public IEnumerable<OpportunityVM> GetOpportunitiesByTenantAdmin([Service] IOpportunityRepository IOpportunity, [Required] int tenantId)
        {
            return IOpportunity.GetOpportunitiesByTenantAdmin(tenantId).ToList();
        }

        public IEnumerable<OpportunityVM> GetOpportunitiesByUser([Service] IOpportunityRepository IOpportunity, [Required] int userId)
        {
            return IOpportunity.GetOpportunitiesByUser(userId).ToList();
        }
    }
}
