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
          key: 'economico', label: 'Nivel económico', type: 'picker',
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
          key: 'sueño', label: 'Horas de sueño diarias', type: 'numeric',
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
            key: 'ex_desconocer', label: '¿Recuerdas cuánto tiempo llevas sin fumar?', type: 'picker',
            options: [
               { label: 'Sí', value: '1' },
               { label: 'No', value: '0' },
            ],
        },
        {
            key: 'ex_sinfumar', label: 'Años sin fumar', type: 'numeric',
        },  
        {
          key: 'fuma_cigarrillos', label: 'Consumo cigarrillos al día', type: 'numeric',
        },
        {
          key: 'fuma_pipa', label: 'Consumo de tabaco de pipa al día (pipas al día)', type: 'numeric',
        },
        {
          key: 'fuma_puros', label: 'Consumo de puros al día', type: 'numeric',
        },
      ],
    },
    {
        key: 'info_dieta',
        title: 'Información dietética',
        fields: [
          {
            key: 'aceite', label: 'Consumo diario de aceite de Oliva (1 ración = 1 cucharada sopera)', type: 'numeric',
          },
          {
            key: 'verdura', label: 'Consumo diario de verduras ( acompañamiento es media ración, 0.5)', type: 'numeric',
          },
          {
            key: 'fruta', label: 'Consumo diario de fruta (zumo cuenta como 1)', type: 'numeric',
          },
          {
            key: 'carne_roja', label: 'Consumo diario de carne roja( 1ración 100/150g)', type: 'numeric',
          },
          {
            key: 'mantequilla', label: 'Consumo diario de mantequilla (1 ración son 12g)', type: 'numeric',
          },
          {
            key: 'refrescos', label: 'Consumo diario de refrescos', type: 'numeric',
          },
          {
            key: 'legumbres', label: 'Consumo semanal de legumbres (1 ración, 150g) ', type: 'numeric',
          },
          {
            key: 'pescado', label: 'Consumo semanal de pescado (1 ración 100/150g o 4 piezas de marisco)', type: 'numeric',
          },
          {
            key: 'reposteria', label: 'Consumo semanal de reposteria insdustrial', type: 'numeric',
          },
          {
            key: 'frutos_secos', label: 'Consumo semanal de frutos secos (1 ración, 30g)', type: 'numeric',
          },
          {
            key: 'carne_blanca', label: '¿Su consumo semanal de carne blanca excede el de carne roja?',
            options: [
                { label: 'Sí', value: '1' },
                { label: 'No', value: '0' },
             ],
          },
          {
            key: 'sofrito', label: 'Consumo semanal de sofrito, salsas, etc', type: 'numeric',
          },
          {
            key: 'lacteos', label: 'Consumo diario de lácteos (1 ración es una taza de leche, un yogurt, etc', type: 'numeric',
          },
          {
            key: 'lacteos_desnatados', label: '¿Consume más productos lácteos desnatados que normales?', 
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
            key: 'destilados', label: '¿Consume alcoholes destilados?',
            options: [
                { label: 'Sí', value: '1' },
                { label: 'No', value: '0' },
             ],
          },
          {
            key: 'copas_destilados', label: 'Número de copas de alcoholes destilados (semanales)', type: 'numeric',
          },
          {
            key: 'fermentados', label: '¿Consume alcoholes fermentados?',
            options: [
                { label: 'Sí', value: '1' },
                { label: 'No', value: '0' },
             ],
          },
          {
            key: 'copas_fermentados', label: 'Número de copas de alcoholes fermentados (semanales)', type: 'numeric',
          },
          {
            key: 'copas_vinotinto', label: 'Número de copas de vino tinto (semanales)', type: 'numeric',
          },
          {
            key: 'copas_vinoblanco', label: 'Número de copas de vino blanco (semanales)', type: 'numeric',
          },
          {
            key: 'copas_vinorosado', label: 'Número de copas de vino rosado (semanales)', type: 'numeric',
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
                key: 'cancer_mama', label: '¿Cáncer de mama?', type: 'picker',
                options: [
                  { label: 'Sí', value: '1' },
                  { label: 'No', value: '0' }
                ]
            },
            {
                key: 'cancer_colon', label: '¿Cáncer de colon?', type: 'picker',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' }
                ]
            },
            {
                key: 'cancer_prostata', label: '¿Cáncer de próstata?', type: 'picker',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' }
                ]
            },
            {
                key: 'cancer_pulmon', label: '¿Cáncer de pulmón?', type: 'picker',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' }
                ]
            },
            {
                key: 'cancer_otro', label: '¿Otro tipo de cáncer?', type: 'picker',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' }
                ]
            },
            {
                key: 'infarto_miocardio', label: 'Infarto de miocardio',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' },
                 ],
            },
            {
                key: 'angina', label: 'Angina de pecho',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' },
                    ],
            },
            {
                key: 'insuficiencia_cardiaca', label: 'Insuficiencia cardíaca',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' },
                ],
            },
            {
                key: 'diabetes', label: 'Diabetes tipo 2',
                options: [
                    { label: 'Sí', value: '1' },
                    { label: 'No', value: '0' },
                ],
            },
            {
                key: 'metabólico', label: 'Sindrome metabólico',
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
                key: 'bronquitis', label: 'Bronquitis crónica',
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
            key: 'ejercicioIntenso', label: 'Ejercicio intenso (min/sem)', type: 'numeric',
          },
          {
            key: 'ejercicioModerado', label: 'Ejercicio moderado (min/sem)', type: 'numeric',
          },
          {
            key: 'caminar', label: 'Caminar (min/sem)', type: 'numeric',
          },
          {
            key: 'sentado', label: 'Minutos sentado por día', type: 'numeric',
          },
        ],
      },
  ];

  
  