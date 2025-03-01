﻿using AutoMapper;
using ClosedXML.Excel;
using CRMCore.Application.Dto.ImportExport;
using CRMCore.Application.Dto.Users;
using CRMCore.Application.Enums;
using CRMCore.Application.Interface.Generic;
using CRMCore.Application.Interface.Roles;
using CRMCore.EntityFrameWorkCore;
using CRMCore.EntityFrameWorkCore.Model.Users;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Role = CRMCore.EntityFrameWorkCore.Model.Users.Role;

namespace CRMCore.Application.Repository.Roles
{
    public class RoleRepository : IRoleRepository
    {
        private readonly CRMCoreDbContext db;
        private readonly IMapper mapper;
        //private readonly IGenericRepository<UserRole> IGeneric;
        private readonly IGenericRepository<Role> IGeneric;

		public RoleRepository(CRMCoreDbContext context, IMapper _mapper, IGenericRepository<Role> generic)
        {
            db = context;
            mapper = _mapper;
            IGeneric = generic;
        }

        public IEnumerable<UserRoleVM> GetRoles()
        {
            var roleList = IGeneric.GetAll().ToList();
            List<UserRoleVM> map = mapper.Map<List<UserRoleVM>>(roleList);
            return map.OrderByDescending(a => a.Id);
        }

        public Role AddRole(UserRoleVM role)
        {
            var map = mapper.Map<Role>(role);
            map.CreatedOn = DateTime.Now;
            map.Status = GetDisplayName(Status.Active);
            IGeneric.Create(map);
            return map;
        }

        public Role UpdateRole(UserRoleVM role)
        {
            var map = mapper.Map<Role>(role);
            var date = db.UserRoles.Where(a => a.Id == role.Id).FirstOrDefault();
            map.CreatedOn = date?.CreatedOn;
            IGeneric.Update(map);
            return map;
        }

        public Role DeleteRole(int roleId)
        {
            IGeneric.Delete(roleId);
            return null;
        }

        public Role AddUserRoleImportData(ImportExcel model, List<String> rowData)
        {
            var entity = new Role
			{
                Name = rowData[0].Trim(),
                Status = rowData[1].Trim(),
                CreatedOn = DateTime.Now,
            };
            db.Roles.Add(entity);
            return entity;
        }

        public IEnumerable<UserRoleVM> GetSampleDataByUserRole(XLWorkbook wb)
        {
            var sampleRoles = new List<UserRoleVM>
            {
                new UserRoleVM { Name = "Contact person", Status = "Active" },
                new UserRoleVM { Name = "Supplier", Status = "Active" }
            };

            var sheet = wb.Worksheets.Add("Roles");

            sheet.Cell(1, 1).Value = "   " + "* Name";
            sheet.Cell(1, 2).Value = "   " + "* Status";

            var headerRange = sheet.Range("A1:B1");
            headerRange.Style.Font.Bold = true;
            headerRange.Style.Font.FontColor = XLColor.White;
            headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#2276e3");

            sheet.Column(1).Width = 45;
            sheet.Column(2).Width = 35;

            int rowIndex = 2;
            foreach (var employee in sampleRoles)
            {
                sheet.Cell(rowIndex, 1).Value = "   " + employee.Name;
                sheet.Cell(rowIndex, 2).Value = "   " + employee.Status;
                rowIndex++;
            }

            return null;
        }

        private string GetDisplayName(Enum enumValue)
        {
            return enumValue.GetType()
                            .GetMember(enumValue.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName();
        }
    }
}
