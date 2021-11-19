import React from 'react';
import Axios from "axios";


export default function Payment() {
    
return (
    
    <div class="wrapper col-6">
      <div class="payment payment-gateway">
        <div class="payment-logo">
            <p>P</p>
        </div>
        
        <h2>Payment Gateway</h2>
        <div class="form">
          <div class="card space icon-relative">
            <label class="label">Card holder:</label>
            <input type="text" class="input" placeholder="Name"/>
            <i class="fas fa-user"></i>
          </div>
          <div class="card space icon-relative">
            <label class="label">Card number:</label>
            <input type="text" class="input" data-mask="0000 0000 0000 0000" placeholder="Card Number"/>
            <i class="far fa-credit-card"></i>
          </div>
          <div class="card-grp space  pg-1">
            <div class="card-item icon-relative pg-2 pg2-1">
              <label class="label">Expiry date:</label>
              <input type="text" name="expiry-data" class="input" data-mask="00 / 00"  placeholder="00/00" />
              <i class="far fa-calendar-alt"></i>
            </div>
            <div class="card-item icon-relative pg-2">
              <label class="label">CVC:</label>
              <input type="text" class="input" data-mask="000" placeholder="000" />
              <i class="fas fa-lock"></i>
            </div>
          </div>
            
          <div class="btn-pg">
            Pay
          </div> 
          
        </div>
      </div>
    </div>
    
)
    
}
