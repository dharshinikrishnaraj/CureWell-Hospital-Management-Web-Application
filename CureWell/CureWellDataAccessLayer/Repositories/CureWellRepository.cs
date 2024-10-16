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
            }
            catch (Exception)
            {
                return null;
            }
            return surgeryTypes;
        }

        public bool UpdateDoctorDetails(Doctor dObj)
        {
            Doctor doctor = new Doctor();
            try
            {
                doctor = _context.Doctors.Find(dObj.DoctorId);
                if (doctor != null)
                {
                    doctor.DoctorName = dObj.DoctorName;
                    _context.SaveChanges();
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateSurgery(Surgery sObj)
        {
            Surgery surgery = new Surgery();
            try
            {
                surgery = _context.Surgeries.Find(sObj.SurgeryId);
                if (surgery != null)
                {
                    surgery.DoctorId = sObj.DoctorId;
                    surgery.SurgeryDate = sObj.SurgeryDate;
                    surgery.StartTime = sObj.StartTime;
                    surgery.EndTime = sObj.EndTime;
                    surgery.SurgeryCategory = sObj.SurgeryCategory;
                    _context.SaveChanges();
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool DeleteDoctor(Doctor dObj)
        {
            Doctor doctor = new Doctor();
            try
            {
                doctor = _context.Doctors.Where(d => d.DoctorId == dObj.DoctorId).FirstOrDefault();
                if (doctor != null)
                {
                    _context.Doctors.Remove(doctor);
                    _context.SaveChanges();
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
