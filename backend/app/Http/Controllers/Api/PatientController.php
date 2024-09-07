<?php

namespace App\Http\Controllers\Api;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::all();
        return response()->json($patients);
    }

    public function store(Request $request)
    {
        $data = Validator::make($request->all(), [
            'name' => 'required|string|unique:patients',
            'phone' => 'required|string',
            'address' => 'required|string',
            'doctor' => 'required|string',
        ]);

        if ($data->fails()) {
            return response()->json($data->errors(), 400);
        }

        $patient = Patient::create($request->all());

        return response()->json([
            'message' => 'Patient created successfully',
            'data' => $patient
        ], 201);
    }

    public function show(string $id)
    {
        $patient = Patient::find($id);
        if ($patient) {
            return response()->json([
                'message' => 'Patient found',
                'data' => $patient
            ], 200);
        }
        return response()->json(['message' => 'Patient not found'], 404);
    }

    public function update(Request $request, string $id)
    {
        $patient = Patient::find($id);
        if ($patient) {
            $data = $request->validate([
                'name' => [
                    'required',
                    'string',
                    Rule::unique('patients')->ignore($id)
                ],
                'phone' => 'required|string',
                'address' => 'required|string',
                'doctor' => 'required|string',
            ]);

            $patient->update($data);
            return response()->json([
                'message' => 'Patient updated successfully',
                'data' => $patient
            ], 201);
        }
        return response()->json(['message' => 'Patient not found'], 404);
    }

    public function destroy(string $id)
    {
        $patient = Patient::find($id);
        if ($patient) {
            $patient->delete();
            return response()->json(['message' => 'Patient deleted successfully'], 200);
        }
        return response()->json(['message' => 'Patient not found'], 404);
    }
}
