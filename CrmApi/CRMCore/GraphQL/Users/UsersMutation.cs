using CRMCore.Application.Dto.Users;
using CRMCore.Application.Interface.Users;
using CRMCore.EntityFrameWorkCore;
using CRMCore.EntityFrameWorkCore.Model.Users;
using System.ComponentModel.DataAnnotations;

namespace CRMCore.Web.GraphQL.Users
{
    [ExtendObjectType("Mutation")]
    public class UsersMutation
    {
        public User AddOrUpdateUser([Service] IUserRepository IUser, UserVM user)
        {
            if (user.Id == 0)
            {
                return IUser.AddUser(user);
            }
            return IUser.UpdateUser(user);
        }

        public bool DeleteUser([Service] IUserRepository IUser, [Service] CRMCoreDbContext db, [Required] int id)
        {
            var user = db.Users.Where(a => a.Id == id).ToList();
            if (user.Count != 0)
            {
                IUser.DeleteUser(id);
                return true;
            }
            return false;
        }
    }
}
