using CRMCore.Application.Dto.Opportunities;
using CRMCore.Application.Interface.Opportunities;
using CRMCore.EntityFrameWorkCore;
using CRMCore.EntityFrameWorkCore.Model.Opportunities;
using System.ComponentModel.DataAnnotations;

namespace CRMCore.Web.GraphQL.Opportunities
{
    [ExtendObjectType("Mutation")]
    public class OpportunitiesMutation
    {
        public Opportunity AddOrUpdateOpportunity([Service] IOpportunityRepository IOpportunity, OpportunityVM opportunity)
        {
            if (opportunity.Id == 0)
            {
                return IOpportunity.AddOpportunity(opportunity);
            }
            return IOpportunity.UpdateOpportunity(opportunity);
        }

        public bool DeleteOpportunity([Service] IOpportunityRepository IOpportunity, [Service] CRMCoreDbContext db, [Required] int id)
        {
            var opportunity = db.Opportunities.Where(a => a.Id == id).ToList();
            if (opportunity.Count != 0)
            {
                IOpportunity.DeleteOpportunity(id);
                return true;
            }
            return false;
        }
    }
}
