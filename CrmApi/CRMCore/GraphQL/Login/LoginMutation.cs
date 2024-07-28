using CRMCore.Application.Dto.Login;
using CRMCore.Application.Interface.Generic;
using CRMCore.EntityFrameWorkCore;
using CRMCore.EntityFrameWorkCore.Model.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data.Entity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CRMCore.Web.GraphQL.Login
{
    [ExtendObjectType("Mutation")]
    public class LoginMutation
    {
        private readonly IConfiguration configuration;

        public LoginMutation(IConfiguration _configuration)
        {
            configuration = _configuration;
        }

        public async Task<LoginResponse> Login([Service] IGenericRepository<User> IGeneric, [Service] CRMCoreDbContext db, LoginVM login)
        {
            var response = new LoginResponse();

            var tenant = db.Tenants.Where(a => a.Name == login.UserName && a.Password == login.Password && a.IsEmailVerified == true).FirstOrDefault();
            var user = IGeneric.GetAll(a => a.Roles).Where(a => a.Name == login.UserName && a.Password == login.Password).FirstOrDefault();

            if (tenant != null)
            {
                var tenantMatch = tenant.Name == login.UserName && tenant.Password == login.Password;
                if (tenantMatch)
                {
                    var claims = new[]
                    {
                        new Claim(ClaimTypes.Role, tenant?.Name)
                    };
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokenOptions = new JwtSecurityToken(issuer: configuration["JWT:ValidIssuer"],
                        audience: configuration["JWT:ValidAudience"],
                        claims: claims,
                        expires: DateTime.Now.AddDays(1),
                        signingCredentials: signinCredentials
                    );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                    response.IsAuthenticated = true;
                    response.Token = tokenString;
                    response.TenantInfo = tenant;
                    response.Message = "You are Logged In !!!";
                    return response;
                }
                response.IsAuthenticated = false;
                response.Message = "Invalid username or password.";
                return response;
            }

            if (user != null)
            {
                var userMatch = user.Name == login.UserName && user.Password == login.Password;
                if (userMatch)
                {
                    var claims = new[]
                    {
                        new Claim(ClaimTypes.Role, user?.Roles?.Name)
                    };
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokenOptions = new JwtSecurityToken(issuer: configuration["JWT:ValidIssuer"],
                        audience: configuration["JWT:ValidAudience"],
                        claims: claims,
                        expires: DateTime.Now.AddDays(1),
                        signingCredentials: signinCredentials
                    );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                    response.IsAuthenticated = true;
                    response.Token = tokenString;
                    response.UserInfo = user;
                    response.Message = "You are Logged In !!!";
                    return response;
                }
                response.IsAuthenticated = false;
                response.Message = "Invalid username or password.";
                return response;
            }

            else
            {
                response.IsAuthenticated = false;
                response.Message = "Invalid Credentials.";
                return response;
            }
        }
    }
}
