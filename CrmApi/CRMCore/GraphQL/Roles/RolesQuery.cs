using CRMCore.Application.Dto.Users;
using CRMCore.Application.Interface.Roles;

namespace CRMCore.Web.GraphQL.Roles
{
    [ExtendObjectType("Query")]
    public class RolesQuery
    {
        public IEnumerable<UserRoleVM> GetRoles([Service] IRoleRepository IRole)
        {
            return IRole.GetRoles().ToList();
        }
    }
}
