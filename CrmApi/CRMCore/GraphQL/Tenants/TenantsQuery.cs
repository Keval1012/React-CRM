using CRMCore.Application.Dto.Tenants;
using CRMCore.Application.Interface.Tenants;

namespace CRMCore.Web.GraphQL.Tenants
{
    [ExtendObjectType("Query")]
    public class TenantsQuery
    {
        public IEnumerable<TenantVM> GetTenants([Service] ITenantRepository ITenant)
        {
            return ITenant.GetTenants().ToList();
        }
    }
}
