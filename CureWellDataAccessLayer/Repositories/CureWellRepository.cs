using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text.Json.Serialization;
using System.Text.Json;
using CureWellDataAccessLayer.Models;

namespace CureWellDataAccessLayer.Repositories
{
    public class CureWellRepository : ICureWellRepository
    {
        private readonly CureWellDbContext _context;
        public CureWellRepository(CureWellDbContext context)
        {
            _context = context;
        }

        public bool AddDoctor(Doctor dObj)
        {
            try
            {
                if (dObj == null)
                {
                    throw new ArgumentNullException(nameof(dObj));
                }
                _context.Doctors.Add(dObj);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public List<Doctor> GetAllDoctors()
        {
            List<Doctor> doctors = new List<Doctor>();
            try
            {
                doctors = _context.Doctors.ToList();
            }
            catch (Exception)
            {
                return null;
            }
            return doctors;
        }

        public List<Doctor> GetAllDoctorsById(int doctorId)
        {
            List<Doctor> doctors = new List<Doctor>();
            try
            {
                doctors = _context.Doctors.Where(x=> x.DoctorId == doctorId).ToList();
            }
            catch (Exception)
            {
                return null;
            }
            return doctors;
        }

        public List<Specialization> GetAllSpecializations()
        {
            List<Specialization> specializations = new List<Specialization>();
            try
            {
                specializations = _context.Specializations.ToList();
            }
            catch (Exception)
            {
                return null;
            }
            return specializations;
        }

        public List<Surgery> GetAllSurgeryTypeForToday()
        {
            List<Surgery> surgeryTypes = new List<Surgery>();
            try
            {
                // Convert DateTime.Today to DateOnly
                DateOnly today = DateOnly.FromDateTime(DateTime.Today);
                surgeryTypes = _context.Surgeries.Where(p => p.SurgeryDate == today).ToList();
                if (surgeryTypes.Count < 0)
                {
                    return null;
                }
            }
            catch (Exception)
            {
                return null;
            }
            return surgeryTypes;
        }

        public bool UpdateDoctorDetails(Doctor dObj)
        {
            Doctor updatedocObj = new Doctor();
            try
            {
                updatedocObj = _context.Doctors.Find(dObj.DoctorId);
                if (updatedocObj != null)
                {
                    updatedocObj.DoctorName = dObj.DoctorName;
                    _context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateSurgery(Surgery SObj)
        {
            Surgery surgery = new Surgery();
            bool status = false;
            try
            {
                surgery = _context.Surgeries.Find(SObj.SurgeryId);
                if (surgery != null)
                {
                    surgery.StartTime = SObj.StartTime;
                    surgery.EndTime = SObj.EndTime;
                    _context.SaveChanges();
                    status = true;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public bool DeleteDoctor(Doctor dObj)
        {
            
            if (dObj.DoctorId <= 0)
            {
                return false;
            }
            try
            {
                var doctor = _context.Doctors.FirstOrDefault(d => d.DoctorId == dObj.DoctorId);
                
                if (doctor == null) {
                    return false;
                }

                // Remove related records in DoctorSpecialization
                var specializations = _context.DoctorSpecializations.Where(ds => ds.DoctorId == dObj.DoctorId);
                _context.DoctorSpecializations.RemoveRange(specializations);

                // Remove related records in surgery
                var surgery = _context.Surgeries.Where(ds => ds.DoctorId == dObj.DoctorId);
                _context.Surgeries.RemoveRange(surgery);

                _context.Doctors.Remove(doctor);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
