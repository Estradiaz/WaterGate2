import { Vue, Component } from "vue-property-decorator";

@Component
export class FormValidate extends Vue {

    isValid: boolean = false
    validate(){
        const forms = this.$refs.form as Vue[] | Vue
        if(Array.isArray(forms)){
            this.isValid = Array.from(forms)
            //@ts-ignore
            .every(form => form.validate())
        } else {
            //@ts-ignore
            this.isValid = forms.validate()
        }
        return this.isValid;
    }
}