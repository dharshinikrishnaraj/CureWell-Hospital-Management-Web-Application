using CureWellDataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CureWellDataAccessLayer.Repositories
{
    public interface ICureWellRepository
    {
        /// <summary>
        /// Add Doctor
        /// </summary>
        /// <param name="dObj"></param>
        /// <returns>true</returns>
        public bool AddDoctor(Doctor dObj);

        /// <summary>
        /// Get All Doctors
        /// </summary>
        /// <returns></returns>
        public List<Doctor> GetAllDoctors();
        /// <summary>
        /// Get All Specializations
        /// </summary>
        /// <returns></returns>
        public List<Specialization> GetAllSpecializations();

        /// <summary>
        /// Get All SurgeryType For Today
        /// </summary>
        /// <returns></returns>
        public List<Surgery> GetAllSurgeryTypeForToday();

        /// <summary>
        ///  Update Doctor Details
        /// </summary>
        /// <param name="dObj"></param>
        /// <returns></returns>
        public bool UpdateDoctorDetails(Doctor dObj);

        /// <summary>
        /// Update Surgery
        /// </summary>
        /// <param name="sObj"></param>
        /// <returns></returns>
        public bool UpdateSurgery(Surgery sObj);

        /// <summary>
        /// Delete Doctor
        /// </summary>
        /// <param name="dObj"></param>
        /// <returns></returns>
        public bool DeleteDoctor(Doctor dObj);
    }
}
