using CRMCore.Application.Dto.Leads;
using CRMCore.Application.Interface.Leads;
using CRMCore.EntityFrameWorkCore;
using CRMCore.EntityFrameWorkCore.Model.Leads;
using System.ComponentModel.DataAnnotations;

namespace CRMCore.Web.GraphQL.Leads
{
    [ExtendObjectType("Mutation")]
    public class LeadsMutation
    {
        public Lead AddOrUpdateLead([Service] ILeadRepository ILead, LeadVM lead)
        {
            if (lead.Id == 0)
            {
                return ILead.AddLead(lead);
            }
            return ILead.UpdateLead(lead);
        }

        public bool DeleteLead([Service] ILeadRepository ILead, [Service] CRMCoreDbContext db, [Required] int id)
        {
            var lead = db.Leads.Where(a => a.Id == id).ToList();
            if (lead.Count != 0)
            {
                ILead.DeleteLead(id);
                return true;
            }
            return false;
        }
    }
}
