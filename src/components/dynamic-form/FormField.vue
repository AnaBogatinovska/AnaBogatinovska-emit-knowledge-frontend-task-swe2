<template>
    <div class="field-editor">
        <div class="field-header">
            <select v-model="fieldData.type" @change="updateFieldData">
                <option value="text">Text Input</option>
                <option value="number">Number Input</option>
                <option value="checkbox">Checkbox</option>
                <option value="select">Dropdown</option>
            </select>
            <button @click="$emit('remove')" class="remove-btn">Remove</button>
        </div>

        <div class="field-settings">
            <div class="setting-group">
                <label>Field Label:</label>
                <input type="text" v-model="fieldData.label" @input="updateFieldData" placeholder="Enter field label"
                    class="setting-input" />
            </div>

            <div class="setting-group">
                <label>Field Name:</label>
                <input type="text" v-model="fieldData.name" @input="updateFieldData" placeholder="Enter field name"
                    class="setting-input" />
            </div>

            <div class="setting-group checkbox-group">
                <label>
                    <input type="checkbox" v-model="fieldData.required" @change="updateFieldData" />
                    Required Field
                </label>
            </div>

            <FieldOptions v-if="isDropdown" v-model="fieldData.options" @update:options="updateOptions" />
        </div>
    </div>
</template>

<script>
import FieldOptions from './FieldOptions.vue'

export default {
    name: 'FormField',
    components: {
        FieldOptions
    },
    props: {
        field: {
            type: Object,
            required: true
        },
        allFields: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            fieldData: { ...this.field }
        }
    },
    computed: {
        isDropdown() {
            return this.fieldData.type === 'select'
        },
        hasAvailableFields() {
            return this.availableFields.length > 0
        },
        availableFields() {
            return this.allFields.filter(f => f.id !== this.field.id)
        }
    },
    methods: {
        updateFieldData() {
            this.$emit('update:field', { ...this.fieldData })
        },
        updateOptions(options) {
            this.fieldData.options = options
            this.updateFieldData()
        }
    }
}
</script>
<style scoped>
.field-editor {
    padding: 1rem;
    border: 2px solid #ddd;
    border-radius: 10px;
    background: #ffffff;
    margin-bottom: 1rem;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.field-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.field-header select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 2px solid #cce7ff;
    border-radius: 5px;
    background: #ffffff;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.field-header select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}

.remove-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.remove-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(220, 53, 69, 0.3);
}

/* Field Settings */
.field-settings .setting-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

.field-settings .setting-input {
    padding: 0.75rem;
    font-size: 1rem;
    border: 2px solid #cce7ff;
    border-radius: 5px;
    background: #ffffff;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.field-settings .setting-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}

.field-settings .checkbox-group {
    display: flex;
    align-items: center;
}

.field-settings .checkbox-group label {
    font-size: 1rem;
    font-weight: 600;
    color: #555;
    margin-left: 0.5rem;
}
</style>
