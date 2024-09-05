import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppSwal {
    async showSuccess(msg: any){
        const selectOption = await Swal.fire({
            title: "Success",
            text: msg,
            icon: "success"
        });

        return selectOption;
    }

    async showFailure(msg: any){
        const selectOption = await Swal.fire({
            title: "Failed !!!",
            text: msg,
            icon: "error"
        });

        return selectOption;
    }

    async showPopup(){
        const selectOption = await Swal.fire({
            title: "Success",
            icon: "success",
            timer: 700,
            timerProgressBar: true,
            showConfirmButton: false,
        });

        return selectOption;
    }
 }