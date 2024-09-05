import cron from 'node-cron';
import { IncidentModel } from '../../data/models/incident.model';
import { EmailService } from '../services/email.service';
import { generateIncidentEmailTemplate } from '../templates/email.template';

export const emailJobs = () => {
    const emailService = new EmailService();

    cron.schedule("*/10 * * * * *", async () => {
        try {
            const incidents = await IncidentModel.find({isEmailSent: false});
            console.log(incidents)
            if(!incidents.length) {
                console.log("NO HAY INCIDENTES PENDIENTES POR ENVIAR");
                return;
            }

            console.log(`Procesando ${incidents.length} incidents.`)

            await Promise.all(
                incidents.map(async (incident) => {
                    try {
                        const htmlBody = generateIncidentEmailTemplate(
                            incident.title!,
                            incident.description!,
                            incident.lat!,
                            incident.lng!
                        )
                        await emailService.sendEmail({
                            to: "aknaib.13js@gmail.com",
                            subject: `Incident: ${incident.title}`,
                            htmlBody: htmlBody
                        });
    
                        let updateIncident = {
                            title: incident.title,
                            description: incident.description,
                            lat: incident.lat,
                            lng: incident.lng,
                            isEmailSent: true
                        }
    
                        await IncidentModel.findByIdAndUpdate(incident._id, updateIncident);
                        console.log("Se actualizo correctamente")
                    } catch (error) {
                        console.error("Error al procesar el incidente");
                    }
                })
            )

        } catch (error) {
            console.error("Error durante el envio de correos");
        }
    });
}