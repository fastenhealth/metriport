import {
  AllergyIntolerance,
  Condition,
  Encounter,
  Immunization,
  Location,
  Medication,
  MedicationStatement,
  Observation,
  Practitioner,
  Resource,
} from "@medplum/fhirtypes";
import { oids } from "../constants";

export interface AugmentedResource<T extends Resource> {
  readonly sectionName: string;
  resource: T;
  readonly typeOid: string;
}

export type VitalObservation = {
  value: string;
  date: string;
  dateTime: string | undefined;
  category: string;
};

export class AugmentedObservation implements AugmentedResource<Observation> {
  constructor(
    public readonly sectionName: string,
    public readonly resource: Observation,
    public readonly typeOid: string,
    public readonly measurement?: VitalObservation
  ) {}
}

export class AugmentedCondition implements AugmentedResource<Condition> {
  public readonly typeOid = oids.problemConcernAct;
  constructor(public readonly sectionName: string, public readonly resource: Condition) {}
}

export class AugmentedMedicationStatement implements AugmentedResource<MedicationStatement> {
  public readonly typeOid = oids.medicationActivity;
  constructor(
    public readonly sectionName: string,
    public readonly resource: MedicationStatement,
    public readonly medication: Medication
  ) {}
}

export class AugmentedAllergy implements AugmentedResource<AllergyIntolerance> {
  public readonly typeOid = oids.allergyConcernAct;
  constructor(public readonly sectionName: string, public readonly resource: AllergyIntolerance) {}
}

export class AugmentedEncounter implements AugmentedResource<Encounter> {
  public readonly typeOid = oids.encounterActivity;
  constructor(
    public readonly sectionName: string,
    public readonly resource: Encounter,
    public readonly practitioners?: Practitioner[],
    public readonly locations?: Location[]
  ) {}
}

export class AugmentedImmunization implements AugmentedResource<Immunization> {
  public readonly typeOid = oids.immunizationActivity;
  constructor(
    public readonly sectionName: string,
    public readonly resource: Immunization,
    public readonly location?: Location,
    public readonly locationName?: string | undefined
  ) {}
}
