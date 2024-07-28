using CRMCore.Application.Dto.Tasks;
using CRMCore.Application.Interface.Tasks;
using CRMCore.EntityFrameWorkCore;
using System.ComponentModel.DataAnnotations;
using Task = CRMCore.EntityFrameWorkCore.Model.Tasks.Task;

namespace CRMCore.Web.GraphQL.Tasks
{
    [ExtendObjectType("Mutation")]
    public class TasksMutation
    {
        public Task AddOrUpdateTask([Service] ITaskRepository ITask, TaskVM task)
        {
            if (task.Id == 0)
            {
                return ITask.AddTask(task);
            }
            return ITask.UpdateTask(task);
        }

        public bool DeleteTask([Service] ITaskRepository ITask, [Service] CRMCoreDbContext db, [Required] int id)
        {
            var task = db.Tasks.Where(a => a.Id == id).ToList();
            if (task.Count != 0)
            {
                ITask.DeleteTask(id);
                return true;
            }
            return false;
        }
    }
}
