import { Routes } from "@angular/router";

export default[
    {path: 'lists',
        loadComponent : () => import ('./components/record/record.component')
    },
 
] as Routes