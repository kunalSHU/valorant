const buildSchema = require('graphql').buildSchema;
const GraphQLScalarType = require('graphql').GraphQLScalarType;

const schema = buildSchema(`
    type Query {
        questionare(id: Int): [Questionare]
        medicationById(id: Int): [Medication]
        medicationByName(name: String): [Medication]
        vitalsByUserId(userId: Int): [Vital]
        allAppointments(): [Appointment]
        appointmentById(id: Int): [Appointment]
        appointmentByUserId(userId: Int): [Appointment]
        prescribedMedicationByAppointmentId(appointmentId: Int): [PrescribedMedication]
        userAllergiesByUserId(userId: Int): [Allergy]
    }

    type Mutation {
        newAppointment(
            appointmentid: Int
            userid: Int
            questionaireId: Int
            doctorid: Int
            created_at: String
            begins_at: String
            ends_at: String
            appt_type: String
            status_appt: String
        ): Appointment!

        newQuestionaire(
            questionaireid: Int
            flu: Boolean
            sneeze: Boolean
            shivers: Boolean
            headache: Boolean
            jointPain: Boolean
            troubleSleeping: Boolean
            shortnessOfBreath: Boolean
            nausea: Boolean
        ): Questionare!

        newMedication(
            medicationid: Int
            medicationName: String 
            medicationCost: Float
            manufacturer: String
            form: String
            pack: String
            otherDetails: String
        ): Medication!

        newPrescribedMedication(
            appointmentid: Int
            medicationid: Int
            date_issued: String
            quantity: Int
            derivedCost: Float
        ): PrescribedMedication!
        
        newAllergy(
            allergyid: Int
            allergyName: String
            otherFacts: String
        ): Allergy!

        newUserAllergy(
            userid: Int
            allergyid: Int
        ): Boolean!

        newUserVitals(
            vitalid: Int
            userid: Int
            bloodpressure: String
            bloodtype: String
            height: String
            weight: String
            dateChecked: String
        ): Boolean!
    }

    type Questionare {
        questionaireid: Int
        flu: String
        sneeze: String
        shivers: String
        headache: String
        jointPain: String
        troubleSleeping: String
        shortnessOfBreath: String
        nausea: String
    }

    type Medication {
        medicationid: Int
        medicationname: String 
        medicationcost: Float
        manufacturer: String
        form: String
        pack: String
        otherdetails: String
    }

    type Vital {
        vitalid: Int
        userid: Int
        bloodpressure: String
        bloodtype: String
        height: String
        weight: String
        datechecked: String
    }

    type Appointment {
        appointmentid: Int
        userid: Int
        questionaireid: Int
        doctorid: Int
        created_at: String
        begins_at: String
        ends_at: String
        appt_type: String
        status_appt: String
    }

    type PrescribedMedication {
        appointmentid: Int
        medicationid: Int
        date_issued: String
        quantity: Int
        derivedcost: Float
    }

    type Allergy {
        allergyid: Int
        allergyname: String
        otherfacts: String
    }

`);
module.exports = schema;
