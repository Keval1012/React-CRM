﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMCore.EntityFrameWorkCore.Model.Users
{
    public class Role
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
		public string Status { get; set; }
		public DateTime? CreatedOn { get; set; }
	}
}
