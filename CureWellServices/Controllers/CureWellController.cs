using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CureWellDataAccessLayer.Models;
using CureWellServices.Models;
using CureWellDataAccessLayer.Repositories;
using Microsoft.AspNetCore.Cors;

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
        private readonly CureWellRepository _repository;
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

        [HttpGet("GetAllDoctorsById/{doctorId}")]
        public JsonResult GetDoctorsById(int doctorId)
        {
            List<CureWellDataAccessLayer.Models.Doctor> doctorList = new List<CureWellDataAccessLayer.Models.Doctor>();
            try
            {
                doctorList = _repository.GetAllDoctorsById(doctorId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
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
            bool status = false;
            try
            {
                CureWellDataAccessLayer.Models.Doctor newDoctor = new CureWellDataAccessLayer.Models.Doctor();
                if (ModelState.IsValid)
                {
                    newDoctor.DoctorId = dObj.DoctorId;
                    newDoctor.DoctorName = dObj.DoctorName;
                    status = _repository.UpdateDoctorDetails(newDoctor);
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpPut("UpdateSurgery")]
        public bool UpdateSurgery(Models.Surgery sObj)
        {
            bool status = false;
            try
            {
                CureWellDataAccessLayer.Models.Surgery newSurgery = new CureWellDataAccessLayer.Models.Surgery();
                if (ModelState.IsValid)
                {
                    newSurgery.DoctorId = sObj.DoctorId;
                    newSurgery.StartTime = sObj.StartTime;
                    newSurgery.EndTime = sObj.EndTime;
                    newSurgery.SurgeryCategory = sObj.SurgeryCategory;
                    newSurgery.SurgeryDate = sObj.SurgeryDate;
                    newSurgery.SurgeryId = sObj.SurgeryId;
                    status = _repository.UpdateSurgery(newSurgery);
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpDelete("DeleteDoctor/{doctorId}")]
        public IActionResult DeleteDoctor(int doctorId)
        {
            if (doctorId <= 0)
            {
                return BadRequest("Invalid doctor ID");
            }

            try
            {
                // Call repository to delete the doctor
                bool isDeleted = _repository.DeleteDoctor(new CureWellDataAccessLayer.Models.Doctor { DoctorId = doctorId });

                if (!isDeleted)
                {
                    return NotFound("Doctor not found or could not be deleted");
                }

                return Ok("Doctor deleted successfully");
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, "An internal error occurred");
            }
        }
    }
}
