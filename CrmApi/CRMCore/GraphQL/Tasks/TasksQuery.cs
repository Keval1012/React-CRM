using CRMCore.Application.Dto.Tasks;
using CRMCore.Application.Interface.Tasks;
using System.ComponentModel.DataAnnotations;

namespace CRMCore.Web.GraphQL.Tasks
{
    [ExtendObjectType("Query")]
    public class TasksQuery
    {
        public IEnumerable<TaskVM> GetTasks([Service] ITaskRepository ITask)
        {
            return ITask.GetTasks().ToList();
        }

        public IEnumerable<TaskVM> GetTasksByTenant([Service] ITaskRepository ITask, [Required] int tenantId)
        {
            return ITask.GetTasksByTenant(tenantId).ToList();
        }

        public IEnumerable<TaskVM> GetTasksByTenantAdmin([Service] ITaskRepository ITask, [Required] int tenantId)
        {
            return ITask.GetTasksByTenantAdmin(tenantId).ToList();
        }

        public IEnumerable<TaskVM> GetTasksByUser([Service] ITaskRepository ITask, [Required] int userId)
        {
            return ITask.GetTasksByUser(userId).ToList();
        }
    }
}
