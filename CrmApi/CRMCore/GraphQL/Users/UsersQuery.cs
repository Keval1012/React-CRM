using CRMCore.Application.Dto.Users;
using CRMCore.Application.Interface.Users;
using System.ComponentModel.DataAnnotations;

namespace CRMCore.Web.GraphQL.Users
{
    [ExtendObjectType("Query")]
    public class UsersQuery
    {
        public IEnumerable<UserVM> GetUsers([Service] IUserRepository IUser)
        {
            return IUser.GetUsers().ToList();
        }

        public IEnumerable<UserVM> GetUsersByTenant([Service] IUserRepository IUser, [Required] int tenantId)
        {
            return IUser.GetUsersByTenant(tenantId).ToList();
        }
    }
}
