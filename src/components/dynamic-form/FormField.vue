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
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.field-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.field-header select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 14px;
    min-width: 150px;
}

.setting-group {
    margin-bottom: 15px;
}

.setting-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #2c3e50;
}

.setting-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.checkbox-group {
    display: flex;
    align-items: center;
}

.checkbox-group label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.remove-btn {
    background-color: #ff4444;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
}

.remove-btn:hover {
    background-color: #ff3333;
}

.field-settings {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
}
</style>