import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "src/environments/environment";
import { AlertModal, AlertModalInputs } from "../components/common/alert.modal/alert.modal.component";
import { ApiGatewayService } from "../service/api.gateway.service";
import { LoadingService } from "../service/loading.service";

export abstract class EmailForm {
	protected abstract emailForm: FormGroup
	protected abstract emailFailTitle: string
	protected abstract handleEmailSuccess()
  public siteKey = environment.recaptchaKey

	constructor(
		protected apiGateway: ApiGatewayService,
		protected dialog: MatDialog,
		protected loadingService: LoadingService
	) { }

	protected submitEmailForm(payload: PdsEmailPayload): void {
		if (this.emailForm.valid) {
			const path = `/default/pdsemaillambda`;
      this.loadingService.startLoading();
			this.apiGateway.doPost(path, payload).then(resp => {
				if (resp.statusCode === 200) {
					this.loadingService.endLoading();
					this.handleEmailSuccess()
				} else {
					this.loadingService.endLoading();
					this.handleEmailFailure()
				}
			})
		}
	}

	protected handleEmailFailure(): void {
		const modalInputs: AlertModalInputs = {
			title: this.emailFailTitle,
			message: 'Please try again later or contact us directly at 571-333-8887 or info@potomacdriving.com'
		}
		this.dialog.open(AlertModal, {
			width: '470px',
			data: modalInputs
		})
	}

	protected getFormVal(controlName: string): any {
		return this.emailForm.get(controlName).value
	}
}

export interface PdsEmailPayload {
	subject: string,
	body: string,
	studentEmail: string,
	studentEmailSubject: string,
	studentEmailBody: string,
	registrationForm?: string
}