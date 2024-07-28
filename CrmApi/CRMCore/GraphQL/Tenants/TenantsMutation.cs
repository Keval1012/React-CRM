using CRMCore.EntityFrameWorkCore;
using System.ComponentModel.DataAnnotations;
using CRMCore.EntityFrameWorkCore.Model.Tenants;
using CRMCore.Application.Interface.Tenants;
using CRMCore.Application.Dto.Tenants;

namespace CRMCore.Web.GraphQL.Tenants
{
    [ExtendObjectType("Mutation")]
    public class TenantsMutation
    {
        public Tenant AddOrUpdateTenant([Service] ITenantRepository ITenant, TenantVM tenant)
        {
            if (tenant.Id == 0)
            {
                return ITenant.AddTenant(tenant);
            }
            return ITenant.UpdateTenant(tenant);
        }

        public bool DeleteTenant([Service] ITenantRepository ITenant, [Service] CRMCoreDbContext db, [Required] int id)
        {
            var tenant = db.Tenants.Where(a => a.Id == id).ToList();
            if (tenant.Count != 0)
            {
                ITenant.DeleteTenant(id);
                return true;
            }
            return false;
        }
    }
}
