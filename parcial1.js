
        const entradasDisponibles = {
            vip: 200,
            general: 200
        };
        const precios = {
            vip: 500.000,
            general: 350.000
        };
        
        
        const cantidadSelect = document.getElementById('cantidad');
        const localidadSection = document.getElementById('localidad-section');
        const opcionesLocalidad = document.getElementById('opciones-localidad');
        const totalSection = document.getElementById('total-section');
        const totalText = document.getElementById('total-text');
        const confirmarBtn = document.getElementById('confirmar');
        
    
        let cantidad = 0;
        let localidadesSeleccionadas = [];
        
        
        cantidadSelect.addEventListener('change', function() {
            cantidad = parseInt(this.value);
            mostraropcioneslocalidad();
        });
        
        confirmarBtn.addEventListener('click', function() {
            alert("ya compraste tus boletas");
            location.reload();
        });
        

        function mostraropcioneslocalidad() {
    
            opcionesLocalidad.innerHTML = '';
            localidadesSeleccionadas = [];
            
            
            localidadSection.classList.remove('hidden');
            
    
            for (let i = 0; i < cantidad; i++) {
                const div = document.createElement('div');
                div.className = 'mb-3';
                
                const label = document.createElement('label');
                label.className = 'form-label';
                label.textContent = `entrada ${i + 1}:`;
                
                const select = document.createElement('select');
                select.className = 'form-select localidad-select';
                select.dataset.index = i;
                
                const opcionDefault = document.createElement('option');
                opcionDefault.value = '';
                opcionDefault.textContent = 'selecciona localidad';
                opcionDefault.disabled = true;
                opcionDefault.selected = true;
                
                const opcionVip = document.createElement('option');
                opcionVip.value = 'vip';
                opcionVip.textContent = 'vip $500,000';
                
                const opcionGeneral = document.createElement('option');
                opcionGeneral.value = 'general';
                opcionGeneral.textContent = 'general $350,00';
                
                select.appendChild(opcionDefault);
                select.appendChild(opcionVip);
                select.appendChild(opcionGeneral);
                
                select.addEventListener('change', actualizartotal);
                
                div.appendChild(label);
                div.appendChild(select);
                opcionesLocalidad.appendChild(div);
            }
        }
        
        function actualizartotal() {
            
            const selects = document.querySelectorAll('.localidad-select');
            localidadesseleccionadas = Array.from(selects).map(select => select.value);
            
            const todasseleccionadas = localidadesseleccionadas.every(localidad => localidad !== '');
            
            if (todasseleccionadas) {
                
                let total = 0;
                let tieneVip = false;
                let tieneGeneral = false;
                
                localidadesseleccionadas.forEach(localidad => {
                    total += precios[localidad];
                    if (localidad === 'vip') tieneVip = true;
                    if (localidad === 'general') tieneGeneral = true;
                });
                
                
                if (tieneVip && tieneGeneral && cantidad === 2) {
                
                    totalText.textContent = `Total con descuento (20%): $${total.toLocaleString()}`;
                } else {
                    totalText.textContent = `Total: $${total.toLocaleString()}`;
                }
                
                
                totalSection.classList.remove('hidden');
            } else {
                totalSection.classList.add('hidden');
            }
        }