<template>
    <div class="dynamic-form">
        <h2>Dynamic Form</h2>
        <form @submit.prevent="handleSubmit">
            <FormField v-for="field in visibleFields" :key="field.id" ref="formFields" :field="field"
                v-model="formData[field.id]" @update:modelValue="handleFieldChange(field.id, $event)" />
            <div class="form-actions">
                <button type="submit" class="submit-button">Submit</button>
            </div>
        </form>

        <div v-if="submittedData" class="submitted-data">
            <h3>Submitted Data</h3>
            <div class="data-grid">
                <template v-for="field in visibleFields" :key="field.id">
                    <div v-if="field.validation.required || submittedData[field.id]?.value != null" class="data-label">
                        {{ field.label }}:
                    </div>
                    <div v-if="field.validation.required || submittedData[field.id]?.value != null" class="data-value">
                        <template v-if="field.type === 'dropdown'">
                            {{ getDropdownLabel(field, submittedData[field.id]) }}
                        </template>
                        <template v-else-if="field.type === 'checkbox'">
                            {{ submittedData[field.id] ? 'Yes' : 'No' }}
                        </template>
                        <template v-else>
                            {{ submittedData[field.id] }}
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import FormField from '../components/dynamic-form/FormField.vue'
import { TextField, NumberField, CheckboxField, DropdownField } from '../models/Field'

export default {
    name: 'DynamicForm',
    components: {
        FormField
    },

    data() {
        return {
            fields: [],
            formData: {},
            isSubmitted: false,
            submittedData: null,
            formSchema: [
                {
                    id: 'name',
                    type: 'text',
                    label: 'Full Name',
                    validation: { required: true },
                    placeholder: 'Enter your full name'
                },
                {
                    id: 'age',
                    type: 'number',
                    label: 'Age',
                    validation: { required: true },
                    min: 12,
                    max: 120,
                    placeholder: 'Enter your age'
                },
                {
                    id: 'isStudent',
                    type: 'checkbox',
                    label: 'Are you a student?'
                },
                {
                    id: 'schoolName',
                    type: 'text',
                    label: 'School Name',
                    conditions: [
                        { field: 'isStudent', operator: 'isTrue' }
                    ],
                    validation: { required: true }
                },
                {
                    id: 'educationLevel',
                    type: 'dropdown',
                    label: 'Education Level',
                    options: [
                        { value: 'highschool', label: 'High School' },
                        { value: 'bachelor', label: 'Bachelor\'s Degree' },
                        { value: 'master', label: 'Master\'s Degree' },
                        { value: 'phd', label: 'PhD' }
                    ],
                    conditions: [
                        { field: 'isStudent', operator: 'isTrue' }
                    ]
                }
            ]
        }
    },
    computed: {
        visibleFields() {
            return this.fields.filter(field => field.visible)
        }
    },
    mounted() {
        this.initializeFields()
    },
    methods: {
        initializeFields() {
            this.fields = this.formSchema.map(fieldConfig => {
                let field
                switch (fieldConfig.type) {
                    case 'text':
                        field = new TextField(fieldConfig)
                        break
                    case 'number':
                        field = new NumberField(fieldConfig)
                        break
                    case 'checkbox':
                        field = new CheckboxField(fieldConfig)
                        break
                    case 'dropdown':
                        field = new DropdownField(fieldConfig)
                        break
                    default:
                        field = new TextField(fieldConfig)
                }
                this.formData[field.id] = field.value
                return field
            })

            this.evaluateConditions();
        },
        handleFieldChange(fieldId, value) {
            this.formData[fieldId] = value
            const field = this.fields.find(f => f.id === fieldId)
            if (field) {
                field.value = value
            }
            this.evaluateConditions()
        },
        evaluateConditions() {
            this.fields.forEach(field => {
                if (field.conditions.length > 0) {
                    field.visible = field.conditions.every(condition => {
                        const sourceField = this.formData[condition.field];
                        switch (condition.operator) {
                            case 'equals':
                                return sourceField === condition.value;
                            case 'notEquals':
                                return sourceField !== condition.value;
                            case 'isTrue':
                                return Boolean(sourceField) === true;
                            case 'isFalse':
                                return Boolean(sourceField) === false;
                            default:
                                return true;
                        }
                    });
                }
            });
        },
        handleSubmit() {
            let hasErrors = false;

            this.$refs.formFields.forEach(fieldRef => {
                fieldRef.clearErrors();
            });

            this.visibleFields.forEach(field => {
                field.value = this.formData[field.id];
                const fieldErrors = field.validate();
                if (fieldErrors.length > 0) {
                    hasErrors = true;
                    const fieldRef = this.$refs.formFields.find(ref => ref.field.id === field.id);
                    if (fieldRef) {
                        fieldRef.showErrors(fieldErrors);
                    }
                }
            });

            if (!hasErrors) {
                this.submittedData = { ...this.formData };
                this.isSubmitted = true;
                this.resetForm();
            }
        },

        resetForm() {
            this.fields.forEach(field => {
                this.formData[field.id] = field.type === 'checkbox' ? false : ''; 
                field.value = this.formData[field.id];
            });
        },
        getDropdownLabel(field, value) {
            const option = field.options.find(opt => opt.value === value);
            return option ? option.label : value;
        }

    }
}
</script>

<style scoped>
.dynamic-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f7f9fc;
    border: 1px solid #dfe3e8;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dynamic-form h2 {
    font-size: 1.8rem;
    font-weight: bold;
    color: #34495e;
    text-align: center;
    margin-bottom: 20px;
}

.form-actions {
    margin-top: 20px;
    text-align: center;
}

.submit-button {
    background-color: #3498db;
    color: #ffffff;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.submit-button:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}


.submitted-data {
    margin-top: 20px;
    padding: 15px;
    background-color: #f7f9fc;
    border: 1px solid #dfe3e8;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submitted-data h3 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #34495e;
    margin-bottom: 15px;
}

.data-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 10px;
}

.data-label {
    font-weight: bold;
    color: #2c3e50;
}

.data-value {
    color: #7f8c8d;
}
</style>