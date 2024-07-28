using CRMCore.Application.Dto.Users;
using CRMCore.Application.Interface.Roles;
using CRMCore.EntityFrameWorkCore;
using CRMCore.EntityFrameWorkCore.Model.Users;
using System.ComponentModel.DataAnnotations;

namespace CRMCore.Web.GraphQL.Roles
{
    [ExtendObjectType("Mutation")]
    public class RolesMutation
    {
        public Role AddOrUpdateRole([Service] IRoleRepository IRole, UserRoleVM role)
        {
            if (role.Id == 0)
            {
                return IRole.AddRole(role);
            }
            return IRole.UpdateRole(role);
        }

        public bool DeleteRole([Service] IRoleRepository IRole, [Service] CRMCoreDbContext db, [Required] int id)
        {
            var role = db.Roles.Where(a => a.Id == id).ToList();
            if (role.Count != 0)
            {
                IRole.DeleteRole(id);
                return true;
            }
            return false;
        }
    }
}