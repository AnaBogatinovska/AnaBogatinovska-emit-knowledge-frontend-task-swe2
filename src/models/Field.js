export class Field {
  constructor(config) {
    this.id = config.id;
    this.type = config.type;
    this.label = config.label;
    this.value = config.value || null;
    this.validation = config.validation || {};
    this.conditions = config.conditions || [];
    this.visible = this.conditions.length === 0;
  }

  validate() {
    const errors = [];

    if (this.validation.required && this.visible) {
      if (this.value === null || this.value === undefined || this.value === '') {
        errors.push(`${this.label} is required`);
      }
    }
    return errors;
  }
}

export class TextField extends Field {
  constructor(config) {
    super(config);
    this.placeholder = config.placeholder || '';
  }
}

export class NumberField extends Field {
  constructor(config) {
    super(config);
    this.min = config.min;
    this.max = config.max;
  }

  validate() {
    const errors = super.validate();
    if (this.visible && this.value !== null && this.value !== undefined) {
      if (this.min !== undefined && this.value < this.min) {
        errors.push(`${this.label} must be at least ${this.min}`);
      }
      if (this.max !== undefined && this.value > this.max) {
        errors.push(`${this.label} must be less than ${this.max}`);
      }
    }
    return errors;
  }
}

export class CheckboxField extends Field {
  constructor(config) {
    super(config);
    this.value = config.value || false;
  }
}

export class DropdownField extends Field {
  constructor(config) {
    super(config);
    this.options = config.options || [];
  }
}