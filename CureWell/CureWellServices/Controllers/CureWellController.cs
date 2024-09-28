using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CureWellDataAccessLayer;
using CureWellDataAccessLayer.Models;
using CureWellServices.Models;

namespace CureWellServices.Controllers
{
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

        [HttpGet(Name = "GetAllDoctors")]
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

        [HttpGet(Name = "GetAllSpecializations")]
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

        [HttpGet(Name = "GetAllSurgeryTypeForToday")]
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

        [HttpPost(Name = "AddDoctor")]
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

        [HttpPut(Name = "UpdateDoctorDetails")]
        public bool UpdateDoctorDetails(Models.Doctor dObj)
        {
            CureWellDataAccessLayer.Models.Doctor doctor = new CureWellDataAccessLayer.Models.Doctor();
            bool status = false;
            try
            {
               doctor.DoctorId = dObj.DoctorId;
               doctor.DoctorName = dObj.DoctorName;
               status =  _repository.UpdateDoctorDetails(doctor);
               status = true;
            }
            catch(Exception)
            {
                status = false;
            }
           return status;
        }

        [HttpPut(Name = "UpdateSurgery")]
        public bool UpdateSurgery(Models.Surgery sObj)
        {
            CureWellDataAccessLayer.Models.Surgery surgery = new CureWellDataAccessLayer.Models.Surgery();
            bool status = false;
            try
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
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpDelete(Name = "DeleteDoctor")]
        public bool DeleteDoctor(Models.Doctor dObj)
        {
            CureWellDataAccessLayer.Models.Doctor result = new CureWellDataAccessLayer.Models.Doctor();
            bool status = false;
            try
            {
                result.DoctorId = dObj.DoctorId;
                result.DoctorName = dObj.DoctorName;
                status = _repository.DeleteDoctor(result);
                status = true;
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }
    }
}
