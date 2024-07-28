using ClosedXML.Excel;
using CRMCore.Application.Dto.ImportExport;
using CRMCore.Application.Dto.Users;
using CRMCore.EntityFrameWorkCore.Model.Users;

namespace CRMCore.Application.Interface.Roles
{
    public interface IRoleRepository
    {
        IEnumerable<UserRoleVM> GetRoles();
		Role AddRole(UserRoleVM role);
		Role UpdateRole(UserRoleVM role);
		Role DeleteRole(int roleId);
		Role AddUserRoleImportData(ImportExcel model, List<String> rowData);
        IEnumerable<UserRoleVM> GetSampleDataByUserRole(XLWorkbook wb);
    }
}
