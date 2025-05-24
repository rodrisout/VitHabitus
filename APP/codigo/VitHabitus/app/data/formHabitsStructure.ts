import profesiones from './profesiones.json';

export const habitFormStructure = [
    {
      key: 'info_general',
      title: 'Información general',
      fields: [
        {
          key: 'sexo',  label: 'Sexo',type: 'picker',
          options: [
            { label: 'Hombre', value: '1' },
            { label: 'Mujer', value: '2' },
          ],
        },
        {
          key: 'edad', label: 'Edad', type: 'numeric',
        },
        {
          key: 'poblacion', label: 'Tamaño de población', type: 'picker',
          options: [
            { label: 'Menos de 2.500 habitantes', value: '1' },
            { label: '2.500 a 20.000 habitantes', value: '2' },
            { label: '20.000 a 50.000 habitantes', value: '3' },
            { label: 'Más de 50.000 habitantes', value: '4' },
          ],
        },
        {
          key: 'estudios', label: 'Nivel de estudios', type: 'picker',
          options: [
            { label: 'Sin estudios', value: '1' },
            { label: 'Estudios Primarios', value: '2' },
            { label: 'Estudios Secundarios', value: '3' },
            { label: 'Estudios Universitarios', value: '4' },
          ],
        },
        {
          key: 'estEconomico', label: 'Nivel económico', type: 'picker',
          options: [
            { label: 'Menos de 1000€/mes', value: '1' },
            { label: 'Entre 1000 y 2000€/mes', value: '2' },
            { label: 'Más de 2000€/mes', value: '3' },
          ],
        },
        {
          key: 'profesion', label: 'Tipo de profesión', type: 'picker',
          options: profesiones.map((p, index) => ({
            label: p,
            value: (index + 1).toString()
          }))
        },
        {
          key: 'estres', label: '¿Tienes estrés?', type: 'picker',
          options: [
            { label: 'Sí', value: '1' },
            { label: 'No', value: '0' },
          ],
        },
        {
          key: 'horDormir', label: 'Horas de sueño diarias', type: 'numeric',
        },
      ],
    },
    {
      key: 'tabaco', 
      title: 'Uso de tabaco',
      fields: [
        {
          key: 'fumador', label: '¿Fumas actualmente?', type: 'picker',
          options: [
            { label: 'Sí', value: '1' },
            { label: 'No', value: '0' },
          ],
        },
        {
          key: 'exfumador', label: '¿Exfumador?', type: 'picker',
          options: [
             { label: 'Sí', value: '1' },
             { label: 'No', value: '0' },
          ],
        },
        {
            key: 'exfumadorNOSABE', label: '¿Recuerdas cuánto tiempo llevas sin fumar?', type: 'picker',
            options: [
               { label: 'Sí', value: '1' },
               { label: 'No', value: '0' },
            ],
        },
        {
            key: 'exfumadorA', label: 'Años sin fumar', type: 'numeric',
        },  
        {
          key: 'fumadorConsumo', label: 'Consumo de cigarrillos al día', type: 'numeric',
        },
        {
          key: 'pipa', label: 'Consumo de tabaco de pipa al día (pipas al día)', type: 'numeric',
        },
        {
          key: 'puros', label: 'Consumo de puros al día', type: 'numeric',
        },
      ],
    },
    {
        key: 'info_dieta',
        title: 'Información dietética',
        fields: [
          {
            key: 'consumoAceiteOliva', label: 'Consumo diario de aceite de Oliva (1 ración = 1 cucharada sopera)', type: 'numeric',
          },
          {
            key: 'consumoVerdura', label: 'Consumo diario de verduras ( acompañamiento es media ración, 0.5)', type: 'numeric',
          },
          {
            key: 'consumoFruta', label: 'Consumo diario de fruta (zumo cuenta como 1)', type: 'numeric',
          },
          {
            key: 'consumoCarne', label: 'Consumo diario de carne roja( 1ración 100/150g)', type: 'numeric',
          },
          {
            key: 'consumoMantequilla', label: 'Consumo diario de mantequilla (1 ración son 12g)', type: 'numeric',
          },
          {
            key: 'consumoRefrescos', label: 'Consumo diario de refrescos', type: 'numeric',
          },
          {
            key: 'consumoLegumbres', label: 'Consumo semanal de legumbres (1 ración, 150g) ', type: 'numeric',
          },
          {
            key: 'consumoPescado', label: 'Consumo semanal de pescado (1 ración 100/150g o 4 piezas de marisco)', type: 'numeric',
          },
          {
            key: 'consumoReposteria', label: 'Consumo semanal de reposteria insdustrial', type: 'numeric',
          },
          {
            key: 'consumoFSecos', label: 'Consumo semanal de frutos secos (1 ración, 30g)', type: 'numeric',
          },
          {
            key: 'consumoPollo', label: '¿Su consumo semanal de carne blanca excede el de carne roja?',
            options: [
                { label: 'Sí', value: '1' },
                { label: 'No', value: '0' },
             ],
          },
          {
            key: 'consumoSofrito', label: 'Consumo semanal de sofrito, salsas, etc', type: 'numeric',
          },
          {
            key: 'consumoLacteo', label: 'Consumo diario de lácteos (1 ración es una taza de leche, un yogurt, etc', type: 'numeric',
          },
          {
            key: 'consumoDesnatado', label: '¿Consume más productos lácteos desnatados que normales?', 
            options: [
                { label: 'Sí', value: '1' },
                { label: 'No', value: '0' },
             ],
          },
        ],
      },

      {
        key: 'alcohol',
        title: 'Consumo Alcohol',
        fields: [
          {
            key: 'alcoholDestilado', label: '¿Consume alcoholes destilados?',
            options: [
                { label: 'Sí', value: '1' },
                { label: 'No', value: '0' },
             ],
          },
          {
            key: 'copasAlcoholDestilado', label: 'Número de copas de alcoholes destilados (semanales)', type: 'numeric',
          },
          {
            key: 'alcoholFermentado', label: '¿Consume alcoholes fermentados?',
            options: [
                { label: 'Sí', value: '1' },
                { label: 'No', value: '0' },
             ],
          },
          {
            key: 'copasAlcoholFermentado', label: 'Número de copas de alcoholes fermentados (semanales)', type: 'numeric',
          },
          {
            key: 'copasVinoTinto', label: 'Número de copas de vino tinto (semanales)', type: 'numeric',
          },
          {
            key: 'copasVinoBlanco', label: 'Número de copas de vino blanco (semanales)', type: 'numeric',
          },
          {
            key: 'copasVinoRosado', label: 'Número de copas de vino rosado (semanales)', type: 'numeric',
          },
        ],
      },
      {
        key: 'info_medica',
        title: 'Información Médica',
        fields: [
            {
                key: 'cancer', label: '¿Padece algún tipo de cáncer?', type: 'picker',
                options: [
                  { label: 'Sí', value: '1' },
                  { label: 'No', value: '0' }
                ]
            },
            {
                key: 'cancerMama', label: '¿Cáncer de mama?', type: 'picker',
                options: [
                  { label: 'Sí', value: '1' },
                  { label: 'No', value: '0' }
                ]
            },
            {
                key: 'cancerColon', label: '¿Cáncer de colon?', type: 'picker',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' }
                ]
            },
            {
                key: 'cancerProstata', label: '¿Cáncer de próstata?', type: 'picker',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' }
                ]
            },
            {
                key: 'cancerPulmon', label: '¿Cáncer de pulmón?', type: 'picker',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' }
                ]
            },
            {
                key: 'cancerOtro', label: '¿Otro tipo de cáncer?', type: 'picker',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' }
                ]
            },
            {
                key: 'infartoMiocardio', label: 'Infarto de miocardio',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' },
                 ],
            },
            {
                key: 'anginaPecho', label: 'Angina de pecho',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' },
                    ],
            },
            {
                key: 'insuficienciaCardiaca', label: 'Insuficiencia cardíaca',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' },
                ],
            },
            {
                key: 'diabetesT2', label: 'Diabetes tipo 2',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' },
                ],
            },
            {
                key: 'sindMetabolico', label: 'Sindrome metabólico',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' },
                ],
            },
            {
                key: 'apnea', label: 'Apnea del sueño',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' },
                ],
            },
            {
                key: 'asma', label: 'Asma',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' },
                ],
            },
            {
                key: 'EPOC', label: 'Bronquitis crónica',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' },
                ],
            },
        ],
      },
      {
        key: 'actividad_fisica',
        title: 'Actividad física',
        fields: [
          {
            key: 'ejercicioIntensoMinutosSemana', label: 'Ejercicio intenso (min/sem)', type: 'numeric',
          },
          {
            key: 'ejercicioModeradoMinutosSemana', label: 'Ejercicio moderado (min/sem)', type: 'numeric',
          },
          {
            key: 'ejercicioCaminadoMinutosSemana', label: 'Caminar (min/sem)', type: 'numeric',
          },
          {
            key: 'sentadoMinutos', label: 'Minutos sentado por día', type: 'numeric',
          },
        ],
      },
  ];
  export default habitFormStructure;
  
  