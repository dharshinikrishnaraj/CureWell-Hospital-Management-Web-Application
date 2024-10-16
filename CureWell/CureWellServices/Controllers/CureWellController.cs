using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CureWellDataAccessLayer.Models;
using CureWellServices.Models;
using CureWellDataAccessLayer.Repositories;

namespace CureWellServices.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CureWellController : Controller
    {
        public CureWellRepository _repository;
        public CureWellController(CureWellRepository repository) 
        {
            _repository = repository;
        }

        [HttpGet("GetAllDoctors")]
        public JsonResult GetDoctors()
        {
            List<Models.Doctor> doctorList = new List<Models.Doctor>();
            try
            {
               var listOfDoctors = _repository.GetAllDoctors();
                if (listOfDoctors.Any())
                {
                    foreach (var item in listOfDoctors)
                    {
                        doctorList.Add(new Models.Doctor()
                        {
                            DoctorId = item.DoctorId,
                            DoctorName = item.DoctorName
                        });
                    }
                }
            }
            catch (Exception)
            {
                doctorList = null;
            }
            return Json(doctorList);
        }

        [HttpGet("GetSpecializations")]
        public JsonResult GetSpecializations()
        {
            List<Models.Specialization> specializations = new List<Models.Specialization>();
            try
            {
                var specializationsList = _repository.GetAllSpecializations();
                if(specializationsList.Any())
                {
                    foreach(var item in specializationsList)
                    {
                        specializations.Add(new Models.Specialization()
                        {
                            SpecializationCode = item.SpecializationCode,
                            SpecializationName = item.SpecializationName
                        });
                    }
                }
            }
            catch (Exception)
            {
                specializations = null;
            }
            return Json(specializations);
        }

        [HttpGet("GetAllSurgeryTypeForToday")]
        public JsonResult GetAllSurgeryTypeForToday()
        {
            List<Models.Surgery> surgery = new List<Models.Surgery>();
            try
            {
                var surgeryList = _repository.GetAllSurgeryTypeForToday();
                if(surgeryList.Any())
                {
                    foreach(var item in surgeryList)
                    {
                        surgery.Add(new Models.Surgery()
                        {
                            SurgeryId = item.SurgeryId,
                            DoctorId = item.DoctorId,
                            SurgeryDate = item.SurgeryDate,
                            StartTime = item.StartTime,
                            EndTime = item.EndTime,
                            SurgeryCategory = item.SurgeryCategory
                        });
                    }
                }
            }
            catch (Exception)
            {
                surgery = null;
            }
            return Json(surgery);
        }

        [HttpPost("AddDoctor")]
        public bool AddDoctor(Models.Doctor dObj)
        {
            CureWellDataAccessLayer.Models.Doctor doctor = new CureWellDataAccessLayer.Models.Doctor();
            bool status = false;
            try
            {
                doctor.DoctorName = dObj.DoctorName;
                status = _repository.AddDoctor(doctor);
                status = true;
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpPut("UpdateDoctorDetails")]
        public bool UpdateDoctorDetails(Models.Doctor dObj)
        {
            CureWellDataAccessLayer.Models.Doctor doctor = new CureWellDataAccessLayer.Models.Doctor();
            bool status = false;
            try
            {
                if (ModelState.IsValid)
                {
                    doctor.DoctorId = dObj.DoctorId;
                    doctor.DoctorName = dObj.DoctorName;
                    status = _repository.UpdateDoctorDetails(doctor);
                    status = true;
                }
            }
            catch(Exception)
            {
                status = false;
            }
           return status;
        }

        [HttpPut("UpdateSurgery")]
        public bool UpdateSurgery(Models.Surgery sObj)
        {
            CureWellDataAccessLayer.Models.Surgery surgery = new CureWellDataAccessLayer.Models.Surgery();
            bool status = false;
            try
            {
                if (ModelState.IsValid)
                {
                    surgery.SurgeryId = sObj.SurgeryId;
                    surgery.DoctorId = sObj.DoctorId;
                    surgery.SurgeryDate = sObj.SurgeryDate;
                    surgery.SurgeryCategory = sObj.SurgeryCategory;
                    surgery.StartTime = sObj.StartTime;
                    surgery.EndTime = sObj.EndTime;
                    status = _repository.UpdateSurgery(surgery);
                    status = true;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpDelete("DeleteDoctor")]
        public bool DeleteDoctor(Models.Doctor dObj)
        {
            CureWellDataAccessLayer.Models.Doctor result = new CureWellDataAccessLayer.Models.Doctor();
            bool status = false;
            try
            {
                if (ModelState.IsValid)
                {
                    result.DoctorId = dObj.DoctorId;
                    result.DoctorName = dObj.DoctorName;
                    status = _repository.DeleteDoctor(result);
                    status = true;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }
    }
}
