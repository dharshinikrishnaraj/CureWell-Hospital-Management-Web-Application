using System;
using System.Collections.Generic;
using CureWellDataAccessLayer.Models;

namespace CureWellDataAccessLayer
{
    public class CureWellRepository
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
            catch(Exception) 
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
                surgeryTypes = _context.Surgeries.Where(p => p.SurgeryDate.Equals(DateTime.Today.Date)).ToList();
            }
            catch (Exception)
            {
                return null;
            }
            return surgeryTypes;
        }

        public bool UpdateDoctorDetails(Doctor dObj)
        {
            try
            {
                _context.Doctors.Update(dObj);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateSurgery(Surgery sObj)
        {
            try
            {
                _context.Surgeries.Update(sObj);
                return true;
            }
            catch(Exception)
            {
                return false;
            }
        }

        public bool DeleteDoctor(Doctor dObj)
        {
            try
            {
                _context.Doctors.Remove(dObj);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
    }
}
